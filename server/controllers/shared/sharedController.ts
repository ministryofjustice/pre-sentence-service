import { Request, Response } from 'express'
import { FormValidation, ValidatedForm, validateForm } from '../../utils/formValidation'

import Report from '../../repositories/entities/report'
import ReportService, { IFieldValue } from '../../services/reportService'
import EventService from '../../services/eventService'

export interface TemplateValues {
  preSentenceType: string
  reportPath: string
  reportId?: string
  data?: Record<string, unknown>
  formValidation?: ValidatedForm
}

export default class SharedController {
  private persistentData: Array<string> = ['crn', 'name']

  path = ''

  templatePath = ''

  redirectPath = ''

  data = {}

  defaultTemplateData = {}

  pageFields: Array<string> = []

  templateValues: TemplateValues = {
    reportId: '',
    reportPath: '',
    preSentenceType: '',
  }

  formValidation: FormValidation = {
    required: [],
  }

  updateReport: () => void

  additionalPostAction: () => void

  correctFormData: (req: Request) => object

  constructor(
    protected readonly reportService: ReportService = null,
    protected readonly eventService: EventService = null,
    protected report: Report = null
  ) {}

  protected renderTemplate(res: Response, templateValues: TemplateValues) {
    res.render(`${this.path}/${this.templatePath}`, templateValues)
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
    const data = {}
    if (this.report && this.report.fieldValues) {
      this.report.fieldValues.forEach(item => {
        if (this.persistentData.includes(item.field.name)) {
          data[item.field.name] = item.value
        }
      })
    }
    return data
  }

  protected checkFieldValueVersions = (req: Request): boolean => {
    let validVersions = true
    if (this.report && this.report.fieldValues && req.session.fieldValues) {
      this.report.fieldValues.forEach(savedValue => {
        const compare = req.session.fieldValues.find(currentValue => currentValue.fieldId === savedValue.fieldId)
        if ((compare ? compare.version : 1) !== savedValue.version) {
          validVersions = false
        }
      })
    }
    return validVersions
  }

  protected updateFields = async (formData: unknown) => {
    const fieldValues: Array<IFieldValue> = []
    if (this.report && this.report.reportDefinition && this.report.reportDefinition.fields) {
      this.report.reportDefinition.fields.forEach(item => {
        if (this.pageFields.includes(item.name)) {
          const fieldValue = this.report.fieldValues.find(value => item.name === value.field.name)
          let tmpValue = null
          if (formData[item.name] && formData[item.name] !== '') {
            tmpValue = Array.isArray(formData[item.name]) ? formData[item.name].join(',') : formData[item.name]
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

  public get = async (req: Request, res: Response): Promise<void> => {
    this.report = await this.reportService.getReportById(req.params.reportId)
    if (this.report) {
      this.getStoredData()
      if (this.updateReport) {
        await this.updateReport()
      }
      req.session.fieldValues = this.report.fieldValues
      this.renderTemplate(res, {
        ...this.templateValues,
        reportId: req.params.reportId,
        data: {
          ...this.defaultTemplateData,
          ...this.data,
          ...this.report,
          ...this.getPersistentData(),
        },
      })
    } else {
      res.redirect(`/${this.path}/${req.params.reportId}/not-found`)
    }
  }

  public post = async (req: Request, res: Response): Promise<void> => {
    this.report = await this.reportService.getReportById(req.params.reportId)
    const validatedForm: ValidatedForm = validateForm(req.body, this.formValidation)
    if (validatedForm.isValid) {
      if (this.correctFormData) {
        req.body = {
          ...req.body,
          ...this.correctFormData(req),
        }
      }
      if (this.checkFieldValueVersions(req)) {
        if (this.additionalPostAction) {
          await this.additionalPostAction()
        }
        await this.updateFields(req.body)
        res.redirect(`/${this.path}/${req.params.reportId}/${this.redirectPath}`)
      } else {
        this.report = await this.reportService.getReportById(req.params.reportId)
        this.renderTemplate(res, {
          ...this.templateValues,
          reportId: req.params.reportId,
          data: {
            versionMismatch: true,
            ...this.data,
            ...req.body,
            ...this.getPersistentData(),
          },
        })
      }
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
