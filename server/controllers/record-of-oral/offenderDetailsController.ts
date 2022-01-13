import BaseController from './baseController'

export default class OffenderDetailsController extends BaseController {
  override templatePath = 'offender-details'

  override redirectPath = 'court-details'

  override pageFields = ['name', 'dateOfBirth', 'crn', 'address', 'pnc']

  override updateReport = async () => {
    if (this.report && this.report.status === 'NOT_STARTED') {
      await this.reportService.updateReport({ ...this.report, status: 'STARTED' })
    }
  }
}
