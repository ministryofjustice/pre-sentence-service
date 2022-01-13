import BaseController from './baseController'

export default class ReportCompletedController extends BaseController {
  override path = 'shared'

  override templatePath = 'report-saved'

  override defaultTemplateData = {
    reportCompleted: true,
  }

  override updateReport = async () => {
    if (this.report) {
      await this.reportService.updateReport({ ...this.report, status: 'COMPLETED' })
    }
  }

  override post = async (): Promise<void> => {
    return null
  }
}
