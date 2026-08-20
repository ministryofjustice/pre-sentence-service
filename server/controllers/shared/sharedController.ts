import { Request, Response } from 'express'

import { ValidatedForm, validateForm } from '../../utils/formValidation'

import ReportDetails from '../../repositories/entities/reportDetails'
import ReportService, { IFieldValue } from '../../services/reportService'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import { transformDefendantDetails } from '../../utils/apiDataTransformers'
import logger from '../../../logger'

import {
  buildSourcesOfInformation,
  isSourceAction,
  SourceOfInformation,
  SourceOfInformationActions,
} from '../../utils/sourcesOfInformationHelpers'
import * as z from 'zod'
import { ReportStatus } from '../../repositories/entities/reportDetails'
import { getReportProgress, areReviewSectionsComplete } from '../../utils/reportProgress'
import { htmlToPlainText } from '../../utils/htmlToPlainText'
import { normalizeSourcesToArray } from '../../schemas/sources-of-information'

enum RiskLevel {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  VeryHigh = 'very_high',
}

const RiskLevelLabels: Record<RiskLevel, string> = {
  [RiskLevel.Low]: 'Low risk',
  [RiskLevel.Medium]: 'Medium risk',
  [RiskLevel.High]: 'High risk',
  [RiskLevel.VeryHigh]: 'Very high risk',
}

const riskOptions = [
  { value: '', text: 'Choose an option' },
  ...Object.entries(RiskLevelLabels).map(([value, text]) => ({
    value,
    text,
  })),
]

export interface TemplateValues<T> {
  preSentenceType: string
  reportPath: string
  reportId?: string
  pageName?: string
  data?: Record<string, unknown>
  formValidation?: ValidatedForm<T>
  riskOptions?: { value: string; text: string }[]
  sourcesOfInformation?: SourceOfInformation[]
  addedSourcesOfInformation?: SourceOfInformation[]
}

interface InclusionExclusion {
  hasAccess: boolean
  disallowedMessage?: string
  disallowedStack?: string
  status?: number
}

export type SharedData = {
  crn?: string
  name?: string
  age?: number
  dateOfBirth?: string
} & { [key: string]: unknown }

export default class SharedController {
  private persistentData: Array<string> = ['crn', 'name']
  protected report!: ReportDetails

  model = z.object()

  path = ''

  templatePath = ''

  redirectPath = ''

  data: SharedData = {}

  defaultTemplateData = {}

  pageFields: Array<string> = []

  templateValues: TemplateValues<z.infer<typeof this.model>> = {
    reportId: '',
    reportPath: '',
    preSentenceType: '',
    riskOptions,
  }

  updateReport!: () => void

  additionalPostAction!: () => void

  correctFormData!: (req: Request) => object

  protected preSentenceToDeliusService?: PreSentenceToDeliusService

  constructor(
    protected readonly reportService: ReportService,
    preSentenceToDeliusService?: PreSentenceToDeliusService
  ) {
    this.preSentenceToDeliusService = preSentenceToDeliusService
  }

  protected renderTemplate(res: Response, templateValues: TemplateValues<z.infer<typeof this.model>>) {
    if (this.templatePath === 'risk-analysis') {
      templateValues.riskOptions = riskOptions
    }

    if (this.templatePath === 'sources-of-information') {
      const sources = buildSourcesOfInformation(
        templateValues.sourcesOfInformation!,
        this.data['sourcesOfInformation'] as string | undefined
      )

      templateValues.sourcesOfInformation = sources.filter(source => !source.isCustom)
      templateValues.addedSourcesOfInformation = sources.filter(source => source.isCustom)
    }

    res.render(`${this.path}/${this.templatePath}`, { ...templateValues, pageName: this.templatePath })
  }

  private checkInclusionExclusion = async (_crn: string, _user: string): Promise<InclusionExclusion> => {
    return {
      hasAccess: true,
    }
  }

  private getStoredData = () => {
    this.data = {}
    if (this.report && this.report.pages) {
      this.report.pages.forEach(page => {
        page.questions.forEach(question => {
          this.data[question.value] = question.answer
        })
      })
    }
  }

  private fetchDefendantDetails = async (reportId: string): Promise<void> => {
    const crn = this.report?.person?.crn

    if (!this.preSentenceToDeliusService) {
      this.data = { ...this.data, crn, apiDefendantDetailsAvailable: false }
      return
    }

    try {
      const apiData = await this.preSentenceToDeliusService.getDefendantDetails(reportId)
      this.data = {
        ...this.data,
        ...transformDefendantDetails(apiData),
        apiDefendantDetailsAvailable: true,
      }
    } catch (error) {
      logger.warn({ reportId, error }, 'Failed to fetch defendant details from Pre-Sentence to Delius API')
      this.data = { ...this.data, crn, apiDefendantDetailsAvailable: false }
    }
  }

  protected updateFields = async (
    fieldData: Record<string, string | string[] | number | undefined>,
    overridePageFields = false
  ) => {
    const fieldValues: IFieldValue[] = []
    const fieldsToUpdate = overridePageFields ? Object.keys(fieldData) : this.pageFields

    let questionId = 0
    for (const fieldName of fieldsToUpdate) {
      if (fieldData[fieldName] !== undefined) {
        const value = fieldData[fieldName]
        let tmpValue = ''

        if (Array.isArray(value)) {
          tmpValue = value.join(',')
        } else if (value !== null) {
          tmpValue = String(value)
        }

        fieldValues.push({
          pageName: this.templatePath,
          questionId: questionId++,
          questionValue: fieldName,
          answer: tmpValue,
        })
      }
    }

    if (fieldValues.length && this.report.id) {
      await this.reportService.updateFieldValues(this.report.id, fieldValues)
    }
  }

  private setStartedDate = async () => {
    const today = new Date()
    const startDateFields = {
      'startDate-day': `0${today.getDate()}`.slice(-2),
      'startDate-month': `0${today.getMonth() + 1}`.slice(-2),
      'startDate-year': today.getFullYear(),
    }
    await this.updateFields(startDateFields, true)
  }

  protected async beforeRender(_req: Request, _res: Response): Promise<void> {
    // Hook for subclasses to override
    // Called after report is loaded but before rendering
  }

  protected async redirectOnGet(_req: Request, _res: Response): Promise<boolean> {
    return false
  }

  public get = async (req: Request<{ reportId: string }>, res: Response): Promise<void> => {
    const reportIdParam = req.params.reportId
    const reportId = reportIdParam
    const removeKey = (req.query.remove as string | undefined)?.trim()

    if (removeKey) {
      await this.reportService.removeCustomSourceOfInformation(reportId, removeKey)
      return res.redirect(`/${this.path}/${reportIdParam}/sources-of-information`)
    }

    const rep = await this.reportService.getReportById(reportId)
    if (rep) {
      this.report = rep

      if (await this.redirectOnGet(req, res)) {
        return
      }

      this.getStoredData()

      await this.fetchDefendantDetails(reportId)

      // Call the hook for subclasses to add their data
      await this.beforeRender(req, res)

      if (!req.session?.isAllowedAccess) {
        const inclusionExclusionCheck = await this.checkInclusionExclusion(
          (this.data.crn as string | undefined) ?? '',
          res.locals?.user?.username
        )
        if (!inclusionExclusionCheck.hasAccess) {
          res.render('pages/error', {
            message: inclusionExclusionCheck.disallowedMessage,
            stack: inclusionExclusionCheck.disallowedStack,
            status: inclusionExclusionCheck.status,
          })
          return
        }
        req.session.isAllowedAccess = true
      }

      let sourcesOfInformation: SourceOfInformation[] | undefined
      if (this.templatePath === 'sources-of-information') {
        sourcesOfInformation = await this.reportService.getSourcesOfInformation(reportId)
      }
      if (this.updateReport) {
        this.updateReport()
      }
      const data = {
        ...this.defaultTemplateData,
        ...this.report,
        ...this.data,
      }
      const reportProgress = getReportProgress(data)
      this.renderTemplate(res, {
        ...this.templateValues,
        reportId: reportIdParam,
        sourcesOfInformation,
        data: {
          ...data,
          sectionStatuses: reportProgress,
          reviewSectionsComplete: areReviewSectionsComplete(reportProgress),
        },
      })
    } else {
      res.redirect(`/${this.path}/${reportIdParam}/not-found`)
    }
  }

  protected updateReportActions = async (req: Request) => {
    if (this.correctFormData) {
      req.body = {
        ...req.body,
        ...this.correctFormData(req),
      }
    }

    if (this.report && this.report.status === ReportStatus.NOT_STARTED) {
      await this.reportService.updateReport(this.report.id!, { status: ReportStatus.STARTED })
      await this.setStartedDate()
    } else if (this.report && this.report.id) {
      await this.reportService.updateReport(this.report.id, {})
    }

    await this.updateFields(req.body)
  }

  private includeAddedSources = async (req: Request, reportId: string): Promise<void> => {
    if (this.templatePath !== 'sources-of-information') return

    const selectedSources = normalizeSourcesToArray(req.body.sourcesOfInformation)
    const allSources = await this.reportService.getSourcesOfInformation(reportId)

    const addedSources = allSources.filter(source => source.isCustom).map(source => source.key)

    req.body.sourcesOfInformation = [...new Set([...selectedSources, ...addedSources])]
  }

  public async post(req: Request<{ reportId: string }>, res: Response): Promise<void> {
    const reportIdParam = req.params.reportId
    const reportId = reportIdParam
    const { action, source } = req.body
    const username = (res.locals?.user?.username as string | undefined) || 'system'
    const redirectPath = req.query?.redirectPath as string | undefined

    if (isSourceAction(action)) {
      const actionValidation = validateForm(req.body, this.model)

      if (actionValidation.isValid) {
        const redirectUrl = await this.handleSourceActions(action, reportIdParam, reportId, source, username)
        return res.redirect(redirectUrl)
      }
    }

    const rep = await this.reportService.getReportById(reportId)
    if (rep) {
      this.report = rep
    }

    await this.includeAddedSources(req, reportId)

    const validatedForm: ValidatedForm<z.infer<typeof this.model>> = validateForm(req.body, this.model)

    if (validatedForm.isValid || redirectPath) {
      await this.updateReportActions(req)

      if (this.additionalPostAction) {
        await this.fetchDefendantDetails(reportIdParam)
        this.additionalPostAction()
      }
      res.redirect(`/${this.path}/${reportIdParam}/${redirectPath || this.redirectPath}`)
    } else {
      await this.persistOnInvalid(req, reportId)

      let sourcesOfInformation: SourceOfInformation[] | undefined
      if (this.templatePath === 'sources-of-information') {
        sourcesOfInformation = await this.reportService.getSourcesOfInformation(reportId)
      }
      await this.fetchDefendantDetails(reportIdParam)
      this.renderTemplate(res, {
        ...this.templateValues,
        reportId: reportIdParam,
        sourcesOfInformation,
        data: {
          ...this.data,
          ...this.normaliseBodyForRender(req.body),
        },
        formValidation: validatedForm,
      })
    }
  }

  private normaliseBodyForRender = (body: Record<string, unknown>): Record<string, unknown> => {
    return Object.fromEntries(
      Object.entries(body).map(([key, value]) => [key, typeof value === 'string' ? htmlToPlainText(value) : value])
    )
  }

  private persistOnInvalid = async (req: Request, reportId: string): Promise<void> => {
    if (!this.report?.id) return

    const body = this.correctFormData ? { ...req.body, ...this.correctFormData(req) } : { ...req.body }
    const dropKeys = this.structurallyInvalidFields(body)

    if (this.report.status === ReportStatus.NOT_STARTED) {
      await this.reportService.updateReport(this.report.id, { status: ReportStatus.STARTED })
    } else {
      await this.reportService.updateReport(this.report.id, {})
    }

    const result = await this.reportService.persistPartialFieldValues(reportId, body, this.templatePath, dropKeys)

    logger.info(
      { reportId, pageName: this.templatePath, persisted: result.persisted, dropped: result.dropped },
      'persisted partial field values after validation failure'
    )
  }

  private structurallyInvalidFields = (body: Record<string, unknown>): string[] => {
    const result = this.model.safeParse(body)
    if (result.success) return []

    const drop = new Set<string>()
    for (const issue of result.error.issues) {
      const field = issue.path[0]
      if (typeof field !== 'string') continue
      if (issue.code === 'invalid_type' || issue.code === 'too_big') {
        drop.add(field)
      }
    }
    return [...drop]
  }

  protected async validateAction(_req: Request): Promise<Record<string, string> | undefined> {
    return undefined
  }

  private async handleSourceActions(
    action: SourceOfInformationActions | undefined,
    reportIdParam: string,
    reportId: string,
    customSource?: string,
    username = 'system'
  ): Promise<string> {
    const path = `/${this.path}/${reportIdParam}/sources-of-information`

    switch (action) {
      case 'add-source': {
        const value = customSource?.trim()

        if (value) {
          await this.reportService.addCustomSourceOfInformation(reportId, value, username)
        }

        return `${path}`
      }

      default:
        return `${path}`
    }
  }
}
