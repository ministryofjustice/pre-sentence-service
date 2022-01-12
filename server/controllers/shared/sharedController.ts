import { Request, Response } from 'express'
import { FormValidation, ValidatedForm, validateForm } from '../../utils/formValidation'

import ReportService from '../../services/reportService'

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

  data = {}

  templateValues: TemplateValues = {
    reportId: '',
    reportPath: '',
    preSentenceType: '',
  }

  formValidation: FormValidation = {
    required: [],
  }

  constructor(private reportService: ReportService = null) {}

  protected renderTemplate(res: Response, templateValues: TemplateValues) {
    res.render(`${this.path}/${this.templatePath}`, templateValues)
  }

  get = async (req: Request, res: Response): Promise<void> => {
    const report = await this.reportService.getReportById(req.params.reportId)
    if (report) {
      this.renderTemplate(res, {
        ...this.templateValues,
        reportId: req.params.reportId,
        data: {
          ...this.data,
          ...report,
        },
      })
    } else {
      res.redirect(`/${this.path}/${req.params.reportId}/not-found`)
    }
  }

  post = async (req: Request, res: Response): Promise<void> => {
    const validatedForm: ValidatedForm = validateForm(req.body, this.formValidation)
    if (validatedForm.isValid) {
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
