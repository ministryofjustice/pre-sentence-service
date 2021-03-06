import { differenceInYears, parse } from 'date-fns'
import BaseController from './baseController'

export const pageFields: Array<string> = [
  'name',
  'dateOfBirth',
  'age',
  'crn',
  'address',
  'pnc',
  'startDate-day',
  'startDate-month',
  'startDate-year',
]

export default class OffenderDetailsController extends BaseController {
  override templatePath = 'offender-details'

  override redirectPath = 'court-details'

  override pageFields = pageFields

  override data: {
    dateOfBirth?: string
    age?: number
    'startDate-day'?: string
    'startDate-month'?: string
    'startDate-year'?: number
  } = {}

  override additionalPostAction = async () => {
    if (this.report && this.report.status === 'NOT_STARTED') {
      await this.reportService.updateReport({ ...this.report, status: 'STARTED' })
    }
  }

  override updateReport = async () => {
    if (this.report && this.report.status === 'NOT_STARTED') {
      const today = new Date()
      const calculatedData = {
        age: differenceInYears(today, parse(this.data.dateOfBirth, 'dd/MM/yyyy', today)),
        'startDate-day': `0${today.getDate()}`.slice(-2),
        'startDate-month': `0${today.getMonth() + 1}`.slice(-2),
        'startDate-year': today.getFullYear(),
      }
      this.data = {
        ...this.data,
        ...calculatedData,
      }
    }
  }
}
