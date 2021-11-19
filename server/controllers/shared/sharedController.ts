import { Request, Response } from 'express'
import { FormValidation, ValidatedForm, validateForm } from '../../utils/formValidation'

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
    reportPath: '',
    preSentenceType: '',
  }

  formValidation: FormValidation = {
    required: [],
  }

  protected renderTemplate(res: Response, templateValues: TemplateValues) {
    res.render(`${this.path}/${this.templatePath}`, templateValues)
  }

  get = async (req: Request, res: Response): Promise<void> => {
    this.renderTemplate(res, {
      reportId: req.params.reportId,
      ...this.templateValues,
      data: {
        ...this.data,
      },
    })
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
