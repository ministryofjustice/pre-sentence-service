import PersonDetailsService from './personDetailsService'
import ReportDetailsService, { IReportDetails, IReportPage } from './reportDetailsService'
import SourcesOfInformationService from './sourcesOfInformationService'
import { CustomSource, SourceKey, SourceOfInformation } from '../utils/sourcesOfInformationHelpers'
import ReportDetails, { ReportStatus } from '../repositories/entities/reportDetails'
import EventService, { IReportEventData } from './eventService'
import logger from '../../logger'
import { LONG_TEXT_MAX, PROPOSED_SENTENCE_MAX, exceedsMaxPlainTextLength } from '../utils/validation'
import { htmlToPlainText } from '../utils/htmlToPlainText'

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

export default class ReportService {
  private personDetailsService: PersonDetailsService
  private reportDetailsService: ReportDetailsService
  private sourcesOfInformationService: SourcesOfInformationService

  constructor() {
    this.personDetailsService = new PersonDetailsService()
    this.reportDetailsService = new ReportDetailsService()
    this.sourcesOfInformationService = new SourcesOfInformationService()
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

    return report
  }

  public async getReportById(id: string): Promise<ReportDetails | null> {
    return this.reportDetailsService.getReportDetailsById(id)
  }

  public async getSourcesOfInformation(reportId: string): Promise<SourceOfInformation[]> {
    return this.sourcesOfInformationService.getSourcesOfInformation(reportId)
  }

  public async saveCustomSourcesOfInformation(
    reportId: string,
    addedSources: CustomSource[],
    removedSources: SourceKey[],
    createdBy: string
  ): Promise<void> {
    return this.sourcesOfInformationService.saveCustomSourcesOfInformation(
      reportId,
      addedSources,
      removedSources,
      createdBy
    )
  }

  public async getAllReportsByType(type: string): Promise<ReportDetails[]> {
    return this.reportDetailsService.getReportDetailsByType(type)
  }

  public async updateReport(id: string, updates: Partial<IReportDetails>): Promise<ReportDetails | null> {
    return this.reportDetailsService.updateReportDetails(id, updates)
  }

  public async deleteReport(id: string): Promise<boolean> {
    return this.reportDetailsService.deleteReportDetails(id)
  }

  public async updateFieldValues(reportId: string, fieldValues: IFieldValue[]): Promise<ReportDetails | null> {
    const report = await this.reportDetailsService.getReportDetailsById(reportId)
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

    return this.reportDetailsService.updateReportPages(reportId, pages)
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

    const stamped = await this.reportDetailsService.updateReportDetails(reportId, { submittedAt })
    if (!stamped) {
      throw new Error(`Report ${reportId} not found when stamping submittedAt`)
    }

    try {
      await this.publishWithRetry(eventService, { ...eventData, reportId })
    } catch (error) {
      await this.reportDetailsService.updateReportDetails(reportId, { submittedAt: null })
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
