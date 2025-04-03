import BaseController from './baseController'

export default class LandingPageController extends BaseController {
  override templatePath = 'psr-start'

  override updateReport = () => {
    if (this.report && this.report.lastUpdated) {
      this.defaultTemplateData = {
        ...this.defaultTemplateData,
        timestamp: new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(
          new Date(this.report.lastUpdated)
        ),
      }
    }
  }

  override post = async (): Promise<void> => {
    return null
  }
}
