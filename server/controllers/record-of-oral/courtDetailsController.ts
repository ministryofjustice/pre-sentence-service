import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export default class CourtDetailsController extends BaseController {
  override templatePath = 'court-details'

  override redirectPath = 'offence-details'

  override pageFields = ['court', 'localJusticeArea', 'dateOfHearing-day', 'dateOfHearing-month', 'dateOfHearing-year']

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
