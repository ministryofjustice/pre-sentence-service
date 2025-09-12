import { Request, Response } from 'express'

import { ValidatedForm, validateForm } from '../../utils/formValidation'

import Report from '../../repositories/entities/report'
import ReportService, { IFieldValue } from '../../services/reportService'

import validateUUID from '../../utils/reportValidation'
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

export interface TemplateValues {
  preSentenceType: string
  reportPath: string
  reportId?: string
  data?: Record<string, unknown>
  formValidation?: ValidatedForm
  riskOptions?: { value: string; text: string }[]
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

  model = z.object()

  path = ''

  templatePath = ''

  redirectPath = ''

  data: SharedData = {}

  defaultTemplateData = {}

  pageFields: Array<string> = []

  templateValues: TemplateValues = {
    reportId: '',
    reportPath: '',
    preSentenceType: '',
    riskOptions,
  }

  updateReport!: () => void

  additionalPostAction!: () => void

  correctFormData!: (req: Request) => object

  constructor(
    protected readonly reportService: ReportService,
    protected report: Report
  ) {}

  protected renderTemplate(res: Response, templateValues: TemplateValues) {
    if (this.templatePath === 'risk-analysis') {
      templateValues.riskOptions = riskOptions
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

  protected updateFields = async (fieldData: any, overridePageFields = false) => {
    const fieldValues: Array<IFieldValue> = []
    if (this.report && this.report.reportDefinition && this.report.reportDefinition.fields) {
      this.report.reportDefinition.fields.forEach(item => {
        if (this.pageFields.includes(item.name) || (overridePageFields && Object.keys(fieldData).includes(item.name))) {
          const fieldValue = this.report.fieldValues.find(value => item.name === value.field.name)
          let tmpValue = fieldValue?.value ?? ''
          if (fieldData[item.name] && fieldData[item.name] !== '') {
            tmpValue = Array.isArray(fieldData[item.name])
              ? (fieldData[item.name] as []).join(',')
              : (fieldData[item.name] as string)
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
    if (validateUUID(req.params.reportId)) {
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

        this.renderTemplate(res, {
          ...this.templateValues,
          reportId: req.params.reportId,
          data: {
            name: persistentData.name,
            ...this.defaultTemplateData,
            ...this.data,
            ...this.report,
            ...persistentData,
          },
        })
      } else {
        res.redirect(`/${this.path}/${req.params.reportId}/not-found`)
      }
    } else {
      res.redirect(`/${this.path}/${req.params.reportId}/not-found`)
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

  public post = async (req: Request, res: Response): Promise<void> => {
    const rep = await this.reportService.getReportById(req.params.reportId)
    if (rep) {
      this.report = rep
    }

    const validatedForm: ValidatedForm = validateForm(req.body, this.model)
    if (validatedForm.isValid || req.query?.redirectPath) {
      await this.updateReportActions(req)

      if (this.additionalPostAction) {
        this.data = {
          ...this.data,
          ...this.getPersistentData(),
        }
        await this.additionalPostAction()
      }
      res.redirect(`/${this.path}/${req.params.reportId}/${req.query?.redirectPath || this.redirectPath}`)
    } else {
      this.renderTemplate(res, {
        ...this.templateValues,
        reportId: req.params.reportId,
        data: {
          ...this.data,
          ...req.body,
          ...this.getPersistentData(),
        },
        formValidation: validatedForm,
      })
    }
  }
}
