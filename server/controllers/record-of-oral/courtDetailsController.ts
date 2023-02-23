import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export const pageFields: Array<string> = [
  'court',
  'localJusticeArea',
  'dateOfHearing-day',
  'dateOfHearing-month',
  'dateOfHearing-year',
]

export default class CourtDetailsController extends BaseController {
  override templatePath = 'court-details'

  override redirectPath = 'offence-details'

  override pageFields = pageFields

  override formValidation: FormValidation = {
    required: [
      {
        id: 'localJusticeArea',
        errorMessage: 'Enter a local justice area',
      },
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

  override updateReport = async () => {
    if (!this.data['dateOfHearing-day']) {
      const today = new Date()
      const calculatedData = {
        'dateOfHearing-day': `0${today.getDate()}`.slice(-2),
        'dateOfHearing-month': `0${today.getMonth() + 1}`.slice(-2),
        'dateOfHearing-year': today.getFullYear(),
      }
      this.data = {
        ...this.data,
        ...calculatedData,
      }
    }
  }
}
