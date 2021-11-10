import BaseController from './baseController'

export default class ReportCompletedController extends BaseController {
  override path = 'shared'

  override templatePath = 'report-saved'

  override data = {
    reportCompleted: true,
  }

  override post = async (): Promise<void> => {
    return null
  }
}