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
      const requiredFields = this.pageFields.concat(this.persistentData)
      this.report.fieldValues.forEach(item => {
        if (requiredFields.includes(item.field.name)) {
          this.data[item.field.name] = item.value
        }
      })
    }
  }

  protected updateFields = async (formData: unknown) => {
    const fieldValues: Array<IFieldValue> = []
    if (this.report && this.report.reportDefinition && this.report.reportDefinition.fields) {
      this.report.reportDefinition.fields.forEach(item => {
        if (this.pageFields.includes(item.name)) {
          const fieldValue = this.report.fieldValues.filter(value => item.name === value.field.name).pop()
          let value = null
          if (formData[item.name] && formData[item.name] !== '') {
            value = Array.isArray(formData[item.name]) ? formData[item.name].join(',') : formData[item.name]
          }
          fieldValues.push({
            reportId: this.report.id,
            fieldId: item.id,
            value,
            version: (fieldValue && fieldValue.version) || 1,
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
        this.updateReport()
      }
      this.renderTemplate(res, {
        ...this.templateValues,
        reportId: req.params.reportId,
        data: {
          ...this.defaultTemplateData,
          ...this.data,
          ...this.report,
        },
      })
    } else {
      res.redirect(`/${this.path}/${req.params.reportId}/not-found`)
    }
  }

  public post = async (req: Request, res: Response): Promise<void> => {
    const validatedForm: ValidatedForm = validateForm(req.body, this.formValidation)
    if (validatedForm.isValid) {
      if (this.correctFormData) {
        req.body = {
          ...req.body,
          ...this.correctFormData(req),
        }
      }
      await this.updateFields(req.body)
      res.redirect(`/${this.path}/${req.params.reportId}/${this.redirectPath}`)
    } else {
      this.renderTemplate(res, {
        reportId: req.params.reportId,
        ...this.templateValues,
        data: {
          ...req.body,
        },
        formValidation: validatedForm,
      })
    }
  }
}
