import BaseController from './baseController'

export default class LandingPageController extends BaseController {
  override templatePath = 'psr-start'

  override updateReport = () => {
    if (this.report && this.report.lastUpdatedBy) {
      this.defaultTemplateData = {
        ...this.defaultTemplateData,
        timestamp: new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(
          new Date(this.report.lastUpdatedBy)
        ),
      }
    }
  }

  override post = async (): Promise<void> => {
    return
  }
}
