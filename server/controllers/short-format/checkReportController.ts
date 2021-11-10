import BaseController from './baseController'

export default class CheckReportController extends BaseController {
  override templatePath = 'check-report'

  override post = async (): Promise<void> => {
    return null
  }
}
