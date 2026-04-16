import BaseController from './baseController'
import config from '../../config'

export default class PublishReportController extends BaseController {
  override templatePath = 'publish-report'

  override redirectPath = 'psr-start'

  override defaultTemplateData = {
    commonPlatformUrl: config.links.commonPlatformUrl,
    digitalCaseSystemUrl: config.links.digitalCaseSystemUrl,
    ndeliusUrl: config.links.ndeliusUrl,
  }
}
