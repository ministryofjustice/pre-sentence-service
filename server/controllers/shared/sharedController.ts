import { Request, Response } from 'express'
import { FormValidation, ValidatedForm, validateForm } from '../../utils/formValidation'

export interface TemplateValues {
  preSentenceType: string
  data?: Record<string, unknown>
  formValidation?: ValidatedForm
}

export default class SharedController {
  path = ''

  templatePath = ''

  redirectPath = ''

  data = {}

  templateValues: TemplateValues = {
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
      ...this.templateValues,
      data: {
        ...this.data,
      },
    })
  }

  post = async (req: Request, res: Response): Promise<void> => {
    const validatedForm: ValidatedForm = validateForm(req.body, this.formValidation)
    if (validatedForm.isValid) {
      res.redirect(`/${this.path}/${this.redirectPath}`)
    } else {
      this.renderTemplate(res, {
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
