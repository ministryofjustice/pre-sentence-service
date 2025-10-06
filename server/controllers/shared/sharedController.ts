import { Request, Response } from 'express'

import { ValidatedForm, validateForm } from '../../utils/formValidation'

import Report from '../../repositories/entities/report'
import ReportService, { IFieldValue } from '../../services/reportService'

import validateUUID from '../../utils/reportValidation'
import {
  buildSourcesOfInformation,
  clearPendingSourcesForReportId,
  getPendingChangesForReport,
  isSourceAction,
  PendingChanges,
  SourceOfInformation,
  SourceOfInformationActions,
  updatePendingChanges,
} from '../../utils/sourcesOfInformationHelpers'
import { Session, SessionData } from 'express-session'
import * as z from 'zod'

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
  data?: Record<string, unknown>
  formValidation?: ValidatedForm<T>
  riskOptions?: { value: string; text: string }[]
  sourcesOfInformation?: SourceOfInformation[]
  isEditing?: boolean
  pendingChanges?: PendingChanges
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
  protected report!: Report

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

  constructor(protected readonly reportService: ReportService) {}

  protected renderTemplate(res: Response, templateValues: TemplateValues<z.infer<typeof this.model>>) {
    if (this.templatePath === 'risk-analysis') {
      templateValues.riskOptions = riskOptions
    }

    if (this.templatePath === 'sources-of-information') {
      templateValues.sourcesOfInformation = buildSourcesOfInformation(
        templateValues.sourcesOfInformation!,
        templateValues.pendingChanges,
        this.data['sourcesOfInformation'] as string | undefined
      )
    }
    res.render(`${this.path}/${this.templatePath}`, templateValues)
  }

  private checkInclusionExclusion = async (_crn: string, _user: string): Promise<InclusionExclusion> => {
    return {
      hasAccess: true,
    }
  }

  private getStoredData = () => {
    this.data = {}
    if (this.report && this.report.fieldValues) {
      this.report.fieldValues.forEach(item => {
        if (this.pageFields.includes(item.field.name)) {
          this.data[item.field.name] = item.value
        }
      })
    }
  }

  private getPersistentData = (): object => {
    const data: { [key: string]: unknown } = {}
    if (this.report && this.report.fieldValues) {
      this.report.fieldValues.forEach(item => {
        if (this.persistentData.includes(item.field.name)) {
          data[item.field.name] = item.value
        }
      })
    }
    return data
  }

  protected updateFields = async (
    fieldData: Record<string, string | string[] | number | undefined>,
    overridePageFields = false
  ) => {
    const fieldValues: Array<IFieldValue> = []
    if (this.report && this.report.reportDefinition && this.report.reportDefinition.fields) {
      this.report.reportDefinition.fields.forEach(item => {
        if (this.pageFields.includes(item.name) || (overridePageFields && Object.keys(fieldData).includes(item.name))) {
          const fieldValue = this.report.fieldValues.find(value => item.name === value.field.name)
          let tmpValue = ''

          // Check if field exists in fieldData (including empty values)
          if (fieldData[item.name] !== undefined) {
            if (Array.isArray(fieldData[item.name])) {
              // Join array values with comma, or empty string for empty array
              tmpValue = (fieldData[item.name] as string[]).join(',')
            } else if (fieldData[item.name] !== null) {
              // Use the value as-is, including empty strings
              tmpValue = String(fieldData[item.name])
            }
          } else {
            // Field not in form data - keep existing value or empty
            tmpValue = fieldValue?.value ?? ''
          }

          fieldValues.push({
            reportId: this.report.id,
            fieldId: item.id,
            value: tmpValue,
            version: fieldValue && fieldValue.version ? fieldValue.version + 1 : 1,
          })
        }
      })
    }
    if (fieldValues.length) {
      await this.reportService.updateFieldValues(fieldValues)
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

  public get = async (req: Request, res: Response): Promise<void> => {
    const reportId = req.params.reportId
    const isEditing = req.path.endsWith('/edit')
    const removeKey = (req.query.remove as string | undefined)?.trim()

    let pendingChanges: PendingChanges | undefined

    if (isEditing) {
      pendingChanges = getPendingChangesForReport(req.session, reportId)

      if (removeKey) {
        updatePendingChanges(pendingChanges, { removeKey })
        return res.redirect(`/${this.path}/${reportId}/sources-of-information/edit`)
      }
    } else if (req.session.pendingChanges) {
      clearPendingSourcesForReportId(req.session.pendingChanges, reportId)
    }

    if (validateUUID(reportId)) {
      const rep = await this.reportService.getReportById(req.params.reportId)
      if (rep) {
        this.report = rep
        this.getStoredData()

        const persistentData: { name?: string; crn?: string } = this.getPersistentData()

        if (!req.session?.isAllowedAccess) {
          const inclusionExclusionCheck = await this.checkInclusionExclusion(
            persistentData.crn ?? '',
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

        req.session.fieldValues = this.report.fieldValues
        let sourcesOfInformation: SourceOfInformation[] | undefined
        if (this.templatePath === 'sources-of-information') {
          sourcesOfInformation = await this.reportService.getSourcesOfInformation(reportId)
        }
        this.renderTemplate(res, {
          ...this.templateValues,
          reportId,
          isEditing,
          pendingChanges,
          sourcesOfInformation,
          data: {
            name: persistentData.name,
            ...this.defaultTemplateData,
            ...this.data,
            ...this.report,
            ...persistentData,
          },
        })
      } else {
        res.redirect(`/${this.path}/${reportId}/not-found`)
      }
    } else {
      res.redirect(`/${this.path}/${reportId}/not-found`)
    }
  }

  protected updateReportActions = async (req: Request) => {
    if (this.correctFormData) {
      req.body = {
        ...req.body,
        ...this.correctFormData(req),
      }
    }

    if (this.report && this.report.status === 'NOT_STARTED') {
      await this.reportService.updateReport({ ...this.report, status: 'STARTED' })
      await this.setStartedDate()
    } else {
      await this.reportService.updateReport({ ...this.report, lastUpdated: new Date().toISOString() })
    }

    await this.updateFields(req.body)
  }

  public async post(req: Request, res: Response): Promise<void> {
    const reportId = req.params.reportId
    const isEditing = req.path.endsWith('/edit')
    const { action, source } = req.body

    if (isSourceAction(action)) {
      const redirectUrl = await this.handleSourceActions(action, reportId, req.session, source)
      return res.redirect(redirectUrl)
    }

    if (!isEditing && req.session.pendingChanges) {
      clearPendingSourcesForReportId(req.session.pendingChanges, reportId)
    }

    const rep = await this.reportService.getReportById(req.params.reportId)
    if (rep) {
      this.report = rep
    }

    const validatedForm: ValidatedForm<z.infer<typeof this.model>> = validateForm(req.body, this.model)
    if (validatedForm.isValid || req.query?.redirectPath) {
      await this.updateReportActions(req)

      if (this.additionalPostAction) {
        this.data = {
          ...this.data,
          ...this.getPersistentData(),
        }
        await this.additionalPostAction()
      }
      res.redirect(`/${this.path}/${reportId}/${req.query?.redirectPath || this.redirectPath}`)
    } else {
      let sourcesOfInformation: SourceOfInformation[] | undefined
      if (this.templatePath === 'sources-of-information') {
        sourcesOfInformation = await this.reportService.getSourcesOfInformation(reportId)
      }
      this.renderTemplate(res, {
        ...this.templateValues,
        reportId,
        sourcesOfInformation,
        data: {
          ...this.data,
          ...req.body,
          ...this.getPersistentData(),
        },
        formValidation: validatedForm,
      })
    }
  }

  private async handleSourceActions(
    action: SourceOfInformationActions | undefined,
    reportId: string,
    session: Session & Partial<SessionData>,
    customSource?: string
  ): Promise<string> {
    const pendingChanges = getPendingChangesForReport(session, reportId)
    const path = `/${this.path}/${reportId}/sources-of-information`

    switch (action) {
      case 'add-source': {
        const savedSources = await this.reportService.getSourcesOfInformation(reportId)
        updatePendingChanges(pendingChanges, { customSource, savedSources })
        return `${path}/edit`
      }

      case 'save-list': {
        const { sourcesToAdd = [], sourcesToRemove = [] } = pendingChanges

        if (sourcesToAdd.length > 0 || sourcesToRemove.length > 0) {
          try {
            await this.reportService.saveCustomSourcesOfInformation(reportId, sourcesToAdd, sourcesToRemove)
            clearPendingSourcesForReportId(session.pendingChanges!, reportId)
          } catch (err) {
            console.error('Failed to save custom sources', { reportId, err })
            return `${path}/edit`
          }
        }
        return path
      }

      default:
        return `${path}/edit`
    }
  }
}
