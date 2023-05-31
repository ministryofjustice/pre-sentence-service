import { differenceInYears, parse } from 'date-fns'
import BaseController from './baseController'
import { Data } from '../shared/sharedController'

export const pageFields: Array<string> = ['name', 'dateOfBirth', 'age', 'crn', 'address', 'pnc']

export default class OffenderDetailsController extends BaseController {
  override templatePath = 'offender-details'

  override redirectPath = 'court-details'

  override pageFields = pageFields

  override updateReport = (data: Data): Data => {
    const today = new Date()
    return {
      ...data,
      age: differenceInYears(today, parse(data.dateOfBirth, 'dd/MM/yyyy', today)),
    }
  }
}
