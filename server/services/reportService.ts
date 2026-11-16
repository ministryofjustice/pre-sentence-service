import PersonDetailsService from './personDetailsService'
import ReportDetailsService, { IReportDetails, IReportPage } from './reportDetailsService'
import SourcesOfInformationService from './sourcesOfInformationService'
import ReportStatusHistoryService, { DELETED_STATUS } from './reportStatusHistoryService'
import { SourceOfInformation } from '../utils/sourcesOfInformationHelpers'
import ReportDetails, { ReportStatus } from '../repositories/entities/reportDetails'
import ReportStatusHistory from '../repositories/entities/reportStatusHistory'
import EventService, { IReportEventData } from './eventService'
import logger from '../../logger'
import { LONG_TEXT_MAX, PROPOSED_SENTENCE_MAX, exceedsMaxPlainTextLength } from '../utils/validation'
import { htmlToPlainText } from '../utils/htmlToPlainText'
import { EntityManager, getConnection } from 'typeorm'
import createError from 'http-errors'

const FIELD_MAX_BY_KEY: Record<string, number> = {
  proposedSentence: PROPOSED_SENTENCE_MAX,
}

const maxForField = (key: string): number => FIELD_MAX_BY_KEY[key] ?? LONG_TEXT_MAX

const RESERVED_BODY_KEYS = new Set(['action', 'pageName', 'CSRFToken', 'reportId', 'source'])

export interface PersistPartialResult {
  persisted: string[]
  dropped: string[]
}

const PUBLISH_MAX_ATTEMPTS = 3
const PUBLISH_BACKOFF_MS = [500, 1500]

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export interface IReport {
  id?: string
  crn: string
}

export interface IFieldValue {
  pageName: string
  questionId: number
  questionValue: string
  answer: string
}

export interface SaveSourcesOfInformationInput {
  reportId: string
  selectedSourceKeys: string[]
  sourceToAdd?: string
  sourceToRemove?: string
  username: string
}

export default class ReportService {
  private personDetailsService: PersonDetailsService
  private reportDetailsService: ReportDetailsService
  private sourcesOfInformationService: SourcesOfInformationService
  private reportStatusHistoryService: ReportStatusHistoryService

  constructor() {
    this.personDetailsService = new PersonDetailsService()
    this.reportDetailsService = new ReportDetailsService()
    this.sourcesOfInformationService = new SourcesOfInformationService()
    this.reportStatusHistoryService = new ReportStatusHistoryService()
  }

  public async createReport(reportData: IReport, createdBy: string): Promise<ReportDetails> {
    let person = await this.personDetailsService.getPersonDetailsByCrn(reportData.crn)

    if (!person) {
      person = await this.personDetailsService.createPersonDetails({
        crn: reportData.crn,
        createdBy,
      })
    }

    const report = await this.reportDetailsService.createReportDetails({
      personId: person.id!,
      createdBy,
    })

    await this.reportStatusHistoryService.recordStatusChange({
      reportId: report.id,
      previousStatus: null,
      newStatus: ReportStatus.NOT_STARTED,
      changedBy: createdBy,
    })

    return report
  }

  public async getReportById(id: string): Promise<ReportDetails | null> {
    return this.reportDetailsService.getReportDetailsById(id)
  }

  public async getReportByIdIncludingDeleted(id: string): Promise<ReportDetails | null> {
    return this.reportDetailsService.getReportDetailsByIdIncludingDeleted(id)
  }

  public async getSourcesOfInformation(reportId: string, manager?: EntityManager): Promise<SourceOfInformation[]> {
    return this.sourcesOfInformationService.getSourcesOfInformation(reportId, manager)
  }

  public async addCustomSourceOfInformation(
    reportId: string,
    value: string,
    createdBy: string,
    manager?: EntityManager
  ): Promise<void> {
    return this.sourcesOfInformationService.addCustomSourceOfInformation(reportId, value, createdBy, manager)
  }

  public async removeCustomSourceOfInformation(reportId: string, key: string, manager?: EntityManager): Promise<void> {
    return this.sourcesOfInformationService.removeCustomSourceOfInformation(reportId, key, manager)
  }

  // Saves the selected sources and any custom-source change together for one report.
  public async saveSourcesOfInformation({
    reportId,
    selectedSourceKeys,
    sourceToAdd,
    sourceToRemove,
    username,
  }: SaveSourcesOfInformationInput): Promise<void> {
    await getConnection().transaction(async manager => {
      const report = await this.reportDetailsService.getReportDetailsById(reportId, manager)

      if (!report) {
        throw new Error(`Report ${reportId} not found when saving sources of information`)
      }

      if (sourceToAdd) {
        await this.addCustomSourceOfInformation(reportId, sourceToAdd, username, manager)
      }

      if (sourceToRemove) {
        await this.removeCustomSourceOfInformation(reportId, sourceToRemove, manager)
      }

      const sources = await this.getSourcesOfInformation(reportId, manager)
      const customSourceKeys = sources.filter(source => source.isCustom).map(source => source.key)

      const fields: IFieldValue[] = [
        {
          pageName: 'sources-of-information',
          questionId: 0,
          questionValue: 'sourcesOfInformation',
          answer: [...new Set([...selectedSourceKeys, ...customSourceKeys])].join(','),
        },
      ]

      if (report.status === ReportStatus.NOT_STARTED) {
        const today = new Date()

        await this.updateReport(reportId, { status: ReportStatus.STARTED }, manager, username)

        fields.push(
          {
            pageName: 'sources-of-information',
            questionId: 1,
            questionValue: 'startDate-day',
            answer: `0${today.getDate()}`.slice(-2),
          },
          {
            pageName: 'sources-of-information',
            questionId: 2,
            questionValue: 'startDate-month',
            answer: `0${today.getMonth() + 1}`.slice(-2),
          },
          {
            pageName: 'sources-of-information',
            questionId: 3,
            questionValue: 'startDate-year',
            answer: String(today.getFullYear()),
          }
        )
      }

      await this.updateFieldValues(reportId, fields, manager)
    })
  }
  public async hasDuplicateSourceOfInformation(reportId: string, value: string): Promise<boolean> {
    return this.sourcesOfInformationService.hasDuplicateSourceOfInformation(reportId, value)
  }

  public async getAllReportsByType(type: string): Promise<ReportDetails[]> {
    return this.reportDetailsService.getReportDetailsByType(type)
  }

  public async updateReport(
    id: string,
    updates: Partial<IReportDetails>,
    manager?: EntityManager,
    username = 'system'
  ): Promise<ReportDetails | null> {
    let previousStatus: ReportStatus | undefined

    if (updates.status !== undefined) {
      const currentReport = await this.reportDetailsService.getReportDetailsById(id, manager)
      previousStatus = currentReport?.status
    }

    const updated = await this.reportDetailsService.updateReportDetails(id, updates, manager)

    if (updates.status !== undefined && updated && previousStatus !== updates.status) {
      await this.reportStatusHistoryService.recordStatusChange(
        {
          reportId: id,
          previousStatus: previousStatus ?? null,
          newStatus: updates.status,
          changedBy: username,
        },
        manager
      )
    }

    return updated
  }

  public async lockReport(id: string, username: string): Promise<ReportDetails> {
    const report = await this.reportDetailsService.getReportDetailsByIdIncludingDeleted(id)

    if (!report || report.isDeleted) {
      throw createError(404, `Report ${id} not found`)
    }

    if (report.status !== ReportStatus.COMPLETED) {
      throw createError(409, `Report ${id} is not in a COMPLETED state`)
    }

    const updated = await this.reportDetailsService.updateReportDetails(id, { status: ReportStatus.LOCKED })

    await this.reportStatusHistoryService.recordStatusChange({
      reportId: id,
      previousStatus: ReportStatus.COMPLETED,
      newStatus: ReportStatus.LOCKED,
      changedBy: username,
    })

    return updated as ReportDetails
  }

  public async unlockReport(id: string, username: string): Promise<ReportDetails> {
    const report = await this.reportDetailsService.getReportDetailsByIdIncludingDeleted(id)

    if (!report || report.isDeleted) {
      throw createError(404, `Report ${id} not found`)
    }

    if (report.status !== ReportStatus.LOCKED) {
      throw createError(409, `Report ${id} is not in a LOCKED state`)
    }

    const updated = await this.reportDetailsService.updateReportDetails(id, { status: ReportStatus.COMPLETED })

    await this.reportStatusHistoryService.recordStatusChange({
      reportId: id,
      previousStatus: ReportStatus.LOCKED,
      newStatus: ReportStatus.COMPLETED,
      changedBy: username,
    })

    return updated as ReportDetails
  }

  public async deleteCompletedReport(id: string, username: string): Promise<void> {
    const report = await this.reportDetailsService.getReportDetailsByIdIncludingDeleted(id)

    if (!report || report.isDeleted) {
      throw createError(404, `Report ${id} not found`)
    }

    if (report.status !== ReportStatus.COMPLETED) {
      throw createError(409, `Report ${id} is not in a COMPLETED state`)
    }

    await this.reportDetailsService.deleteReportDetails(id)

    await this.reportStatusHistoryService.recordStatusChange({
      reportId: id,
      previousStatus: ReportStatus.COMPLETED,
      newStatus: DELETED_STATUS,
      changedBy: username,
    })
  }

  public async deleteReport(id: string, username = 'system'): Promise<boolean> {
    const report = await this.reportDetailsService.getReportDetailsByIdIncludingDeleted(id)

    if (!report || report.isDeleted) {
      return this.reportDetailsService.deleteReportDetails(id)
    }

    const deleted = await this.reportDetailsService.deleteReportDetails(id)

    if (deleted) {
      await this.reportStatusHistoryService.recordStatusChange({
        reportId: id,
        previousStatus: report.status,
        newStatus: DELETED_STATUS,
        changedBy: username,
      })
    }

    return deleted
  }

  public async updateFieldValues(
    reportId: string,
    fieldValues: IFieldValue[],
    manager?: EntityManager
  ): Promise<ReportDetails | null> {
    const report = await this.reportDetailsService.getReportDetailsById(reportId, manager)

    if (!report) {
      return null
    }

    const pages = report.pages || []

    // Group field values by page
    const pageMap = new Map<string, IReportPage>()

    for (const fieldValue of fieldValues) {
      if (!pageMap.has(fieldValue.pageName)) {
        const existingPage = pages.find(p => p.name === fieldValue.pageName)
        pageMap.set(fieldValue.pageName, existingPage || { name: fieldValue.pageName, questions: [] })
      }

      const page = pageMap.get(fieldValue.pageName)!
      const existingQuestionIndex = page.questions.findIndex(q => q.value === fieldValue.questionValue)

      const normalisedAnswer = htmlToPlainText(fieldValue.answer)

      if (existingQuestionIndex >= 0) {
        page.questions[existingQuestionIndex].answer = normalisedAnswer
      } else {
        page.questions.push({
          id: fieldValue.questionId,
          value: fieldValue.questionValue,
          answer: normalisedAnswer,
        })
      }
    }

    // Update pages
    for (const [pageName, pageData] of pageMap.entries()) {
      const existingPageIndex = pages.findIndex(p => p.name === pageName)
      if (existingPageIndex >= 0) {
        pages[existingPageIndex] = pageData
      } else {
        pages.push(pageData)
      }
    }

    return this.reportDetailsService.updateReportPages(reportId, pages, manager)
  }

  public async persistPartialFieldValues(
    reportId: string,
    body: Record<string, unknown>,
    pageName: string,
    extraDropKeys: string[] = []
  ): Promise<PersistPartialResult> {
    const dropSet = new Set(extraDropKeys)
    const persisted: string[] = []
    const dropped: string[] = [...extraDropKeys]
    const fieldValues: IFieldValue[] = []
    let questionId = 0

    for (const [key, value] of Object.entries(body)) {
      if (RESERVED_BODY_KEYS.has(key)) continue
      if (value === undefined) continue
      if (dropSet.has(key)) continue

      const max = maxForField(key)

      if (typeof value === 'string' && exceedsMaxPlainTextLength(value, max)) {
        dropped.push(key)
        continue
      }

      let answer: string
      if (Array.isArray(value)) {
        if (value.some(v => typeof v === 'string' && exceedsMaxPlainTextLength(v, max))) {
          dropped.push(key)
          continue
        }
        answer = value.join(',')
      } else if (value === null) {
        answer = ''
      } else {
        answer = String(value)
      }

      fieldValues.push({ pageName, questionId: questionId++, questionValue: key, answer })
      persisted.push(key)
    }

    if (fieldValues.length > 0) {
      await this.updateFieldValues(reportId, fieldValues)
    }

    return { persisted, dropped }
  }

  public async getDefinitionByType(_type: string): Promise<{ id: number } | null> {
    // This is a compatibility method for the old structure
    // In the new structure, we don't have report definitions
    // We can return a mock object or refactor the calling code
    return { id: 1 }
  }

  public async updateReportStatus(reportId: string, status: ReportStatus): Promise<ReportDetails | null> {
    return this.reportDetailsService.updateReportStatus(reportId, status)
  }

  public async getAllReportsPaginated(
    page: number = 1,
    limit: number = 20
  ): Promise<{ reports: ReportDetails[]; total: number; totalPages: number; currentPage: number }> {
    const result = await this.reportDetailsService.getAllReportsPaginated(page, limit)
    return {
      ...result,
      currentPage: page,
    }
  }

  public async submitReport(
    reportId: string,
    eventService: EventService,
    eventData: Omit<IReportEventData, 'reportId'>
  ): Promise<ReportDetails> {
    const submittedAt = new Date()

    const existing = await this.reportDetailsService.getReportDetailsById(reportId)
    if (!existing) {
      throw new Error(`Report ${reportId} not found when stamping submittedAt`)
    }
    const previousStatus = existing.status

    const stamped = await this.reportDetailsService.updateReportDetails(reportId, {
      submittedAt,
      status: ReportStatus.COMPLETED,
    })
    if (!stamped) {
      throw new Error(`Report ${reportId} not found when stamping submittedAt`)
    }

    let historyRow: ReportStatusHistory | undefined

    try {
      historyRow = await this.reportStatusHistoryService.recordStatusChange({
        reportId,
        previousStatus,
        newStatus: ReportStatus.COMPLETED,
        changedBy: eventData.username,
      })
      await this.publishWithRetry(eventService, { ...eventData, reportId })
    } catch (error) {
      await this.reportDetailsService.updateReportDetails(reportId, { submittedAt: null, status: previousStatus })
      if (historyRow) {
        await this.reportStatusHistoryService.removeStatusChange(historyRow.id)
      }
      throw error
    }

    logger.info('Report submitted', { reportId, submittedAt: submittedAt.toISOString() })

    return stamped
  }

  private async publishWithRetry(eventService: EventService, eventData: IReportEventData): Promise<void> {
    let lastError: unknown
    for (let attempt = 1; attempt <= PUBLISH_MAX_ATTEMPTS; attempt += 1) {
      try {
        await eventService.sendReportEvent(eventData)
        return
      } catch (error) {
        lastError = error
        if (attempt < PUBLISH_MAX_ATTEMPTS) {
          logger.warn('Domain event publish attempt failed, retrying', {
            reportId: eventData.reportId,
            attempt,
            error: error instanceof Error ? error.message : String(error),
          })
          await sleep(PUBLISH_BACKOFF_MS[attempt - 1] ?? PUBLISH_BACKOFF_MS[PUBLISH_BACKOFF_MS.length - 1])
        }
      }
    }
    throw lastError
  }
}
