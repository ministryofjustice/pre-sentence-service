import BaseController from './baseController'
import logger from '../../../logger'

export default class ReportSavedController extends BaseController {
  override path = 'shared'

  override templatePath = 'report-saved'

  override data: {
    crn?: string
  } = {}

  override updateReport = async () => {
    if (this.report) {
      try {
        await this.eventService.sendReportEvent({
          reportId: this.report.id,
          entityId: this.report.entityId,
          crn: this.data.crn,
          reportStatus: 'saved',
        })
      } catch (e: unknown) {
        logger.error('Update report failed:', e)
      }
    }
  }

  override post = async (): Promise<void> => {
    return null
  }
}
