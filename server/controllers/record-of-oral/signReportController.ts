import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export default class SignReportController extends BaseController {
  override templatePath = 'sign-report'

  override redirectPath = 'report-completed'

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

  override pageFields = [
    'reportAuthor',
    'office',
    'officePhoneNumber',
    'startDate-day',
    'startDate-month',
    'startDate-year',
    'completionDate-day',
    'completionDate-month',
    'completionDate-year',
  ]

  override defaultTemplateData = {
    'completionDate-day': new Date().getDate(),
    'completionDate-month': new Date().getMonth() + 1,
    'completionDate-year': new Date().getFullYear(),
  }
}
