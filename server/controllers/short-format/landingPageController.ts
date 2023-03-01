import BaseController from './baseController'
import { Data } from '../shared/sharedController'

export default class LandingPageController extends BaseController {
  override templatePath = 'landing'

  override updateReport = (data: Data): Data => {
    if (this.report && this.report.lastUpdated) {
      this.defaultTemplateData = {
        ...this.defaultTemplateData,
        timestamp: new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(
          new Date(this.report.lastUpdated)
        ),
      }
    }
    return {
      ...data,
    }
  }

  override post = async (): Promise<void> => {
    return null
  }
}
