import { Request, Response } from 'express'
import { FormValidation, ValidatedForm, validateForm } from '../../utils/formValidation'

import ReportService, { IFieldValue } from '../../services/reportService'
import Report from '../../repositories/entities/report'

export interface TemplateValues {
  preSentenceType: string
  reportPath: string
  reportId?: string
  data?: Record<string, unknown>
  formValidation?: ValidatedForm
}

export default class SharedController {
  path = ''

  templatePath = ''

  redirectPath = ''

  // @TODO: Create type definitions for each page and override
  // eslint-disable-next-line no-use-before-define
  data: any = {}

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

  constructor(protected readonly reportService: ReportService = null, protected report: Report = null) {}

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

  protected updateFields = async (formData: unknown) => {
    const fieldValues: Array<IFieldValue> = []
    if (this.report && this.report.reportDefinition && this.report.reportDefinition.fields) {
      this.report.reportDefinition.fields.forEach(item => {
        if (formData[item.name]) {
          const fieldValue = this.report.fieldValues.filter(value => item.name === value.field.name).pop()
          fieldValues.push({
            reportId: this.report.id,
            fieldId: item.id,
            value: Array.isArray(formData[item.name]) ? formData[item.name].join(',') : formData[item.name],
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
          reportAuthor: res.locals && res.locals.user && res.locals.user.displayName ? res.locals.user.displayName : '',
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
      await this.updateFields(req.body)
      res.redirect(`/${this.path}/${req.params.reportId}/${this.redirectPath}`)
    } else {
      this.renderTemplate(res, {
        reportId: req.params.reportId,
        ...this.templateValues,
        data: {
          ...this.data,
          ...req.body,
        },
        formValidation: validatedForm,
      })
    }
  }
}
