import { differenceInYears } from 'date-fns'
import BaseController from './baseController'

export const pageFields: Array<string> = ['name', 'dateOfBirth', 'age', 'crn', 'address', 'pnc']

export default class OffenderDetailsController extends BaseController {
  override templatePath = 'offender-details'

  override redirectPath = 'court-details'

  override pageFields = pageFields

  override updateReport = async () => {
    const today = new Date()
    const dateParts = (this.data && this.data.dateOfBirth && this.data.dateOfBirth.split('/')) || []
    this.data = {
      ...this.data,
      age: differenceInYears(
        today,
        new Date(+parseInt(dateParts[2], 10), parseInt(dateParts[1], 10) - 1, +parseInt(dateParts[0], 10))
      ),
    }
  }
}
