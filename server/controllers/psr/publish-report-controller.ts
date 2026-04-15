import BaseController from './baseController'

export default class PublishReportController extends BaseController {
  override templatePath = 'publish-report'

  override redirectPath = 'psr-start'

  override defaultTemplateData = {
    commonPlatformUrl: 'https://my-services.cjscp.org.uk',
    digitalCaseSystemUrl: 'https://crowncourtdcs.caselines.co.uk/',
    ndeliusUrl: 'https://ndelius.probation.service.justice.gov.uk',
  }
}
