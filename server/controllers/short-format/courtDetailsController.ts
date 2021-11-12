import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export default class CourtDetailsController extends BaseController {
  override templatePath = 'court-details'

  override redirectPath = 'offence-details'

  today = new Date()

  override data = {
    court: "Sheffield Magistrate's Court",
    localJusticeArea: 'South Yorkshire',
    'dateOfHearing-day': this.today.getDate(),
    'dateOfHearing-month': this.today.getMonth() + 1,
    'dateOfHearing-year': this.today.getFullYear(),
  }

  override formValidation: FormValidation = {
    required: [
      {
        id: 'dateOfHearing-day',
        errorMessage: 'Enter a valid day',
      },
      {
        id: 'dateOfHearing-month',
        errorMessage: 'Enter a valid month',
      },
      {
        id: 'dateOfHearing-year',
        minLength: 4,
        errorMessage: 'Enter a valid year',
      },
    ],
  }
}
