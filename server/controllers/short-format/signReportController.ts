import { Response } from 'express'
import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'
import { TemplateValues } from '../shared/sharedController'

export const pageFields: Array<string> = [
  'reportAuthor',
  'office',
  'officePhoneNumber',
  'counterSignature',
  'startDate-day',
  'startDate-month',
  'startDate-year',
  'completionDate-day',
  'completionDate-month',
  'completionDate-year',
]

export default class SignReportController extends BaseController {
  override templatePath = 'sign-report'

  override redirectPath = 'report-completed'

  override pageFields = pageFields

  override formValidation: FormValidation = {
    required: [
      {
        id: 'reportAuthor',
        errorMessage: 'Enter the report author',
      },
      {
        id: 'office',
        errorMessage: 'Enter the office',
      },
      {
        id: 'officePhoneNumber',
        errorMessage: 'Enter the court office phone number',
      },
      {
        id: 'completionDate-day',
        errorMessage: 'Enter a valid day',
      },
      {
        id: 'completionDate-month',
        errorMessage: 'Enter a valid month',
      },
      {
        id: 'completionDate-year',
        errorMessage: 'Enter a valid year',
        minLength: 4,
      },
    ],
  }

  private today = new Date()

  override defaultTemplateData = {
    'completionDate-day': `0${this.today.getDate()}`.slice(-2),
    'completionDate-month': `0${this.today.getMonth() + 1}`.slice(-2),
    'completionDate-year': this.today.getFullYear(),
  }

  override renderTemplate(res: Response, templateValues: TemplateValues) {
    res.render(`${this.path}/${this.templatePath}`, {
      ...templateValues,
      data: {
        reportAuthor: res.locals && res.locals.user && res.locals.user.displayName ? res.locals.user.displayName : '',
        ...templateValues.data,
        'startDate-day': this.data['startDate-day'],
        'startDate-month': this.data['startDate-month'],
        'startDate-year': this.data['startDate-year'],
      },
    })
  }
}
