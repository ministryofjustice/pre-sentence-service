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
        id: 'courtOfficePhoneNumber',
        errorMessage: 'Enter the court office phone number',
      },
      {
        id: 'reportDate-day',
        errorMessage: 'Enter a valid day',
      },
      {
        id: 'reportDate-month',
        errorMessage: 'Enter a valid month',
      },
      {
        id: 'reportDate-year',
        errorMessage: 'Enter a valid year',
        minLength: 4,
      },
    ],
  }

  today = new Date()

  override data = {
    reportAuthor: 'Arthur Author',
    office: "Probation office, Sheffield Magistrate's Court",
    courtOfficePhoneNumber: '0114 276 0760',
    'reportDate-day': this.today.getDate(),
    'reportDate-month': this.today.getMonth() + 1,
    'reportDate-year': this.today.getFullYear(),
  }
}
