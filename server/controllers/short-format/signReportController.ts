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

  today = new Date()

  override defaultTemplateData = {
    startDate: new Intl.DateTimeFormat('en-GB').format(new Date()),
    reportAuthor: '',
    office: '',
    officePhoneNumber: '',
    'completionDate-day': this.today.getDate(),
    'completionDate-month': this.today.getMonth() + 1,
    'completionDate-year': this.today.getFullYear(),
  }
}
