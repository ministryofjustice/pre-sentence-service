import BaseController from './baseController'

export default class OffenderDetailsController extends BaseController {
  override templatePath = 'offender-details'

  override redirectPath = 'court-details'

  override pageFields = ['name', 'dateOfBirth', 'crn', 'address', 'pnc']

  override updateReport = async () => {
    if (this.report && this.report.status === 'NOT_STARTED') {
      const today = new Date()
      await this.reportService.updateReport({ ...this.report, status: 'STARTED' })
      await this.updateFields({
        'startDate-day': `0${today.getDate()}`.slice(-2),
        'startDate-month': `0${today.getMonth() + 1}`.slice(-2),
        'startDate-year': today.getFullYear(),
      })
    }
  }
}
