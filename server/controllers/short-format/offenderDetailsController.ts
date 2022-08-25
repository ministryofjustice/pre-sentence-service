import { differenceInYears, parse } from 'date-fns'
import BaseController from './baseController'

export const pageFields: Array<string> = ['name', 'dateOfBirth', 'age', 'crn', 'address', 'pnc']

export default class OffenderDetailsController extends BaseController {
  override templatePath = 'offender-details'

  override redirectPath = 'court-details'

  override pageFields = pageFields

  override data: {
    dateOfBirth?: string
    age?: number
  } = {}

  override updateReport = async () => {
    const today = new Date()
    this.data = {
      ...this.data,
      age: differenceInYears(today, parse(this.data.dateOfBirth, 'dd/MM/yyyy', today)),
    }
  }
}
