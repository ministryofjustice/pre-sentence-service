import BaseController from './baseController'

export default class ReportSavedController extends BaseController {
  override path = 'shared'

  override templatePath = 'report-saved'

  override post = async (): Promise<void> => {
    return null
  }
}
