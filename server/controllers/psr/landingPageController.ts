import { Request, Response } from 'express'

import BaseController from './baseController'
import { ReportStatus } from '../../repositories/entities/reportDetails'

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

  override get = async (req: Request, res: Response): Promise<void> => {
    const reportId = req.params.reportId
    const report = await this.reportService.getReportById(reportId)

    if (!report) {
      res.redirect(`/${this.path}/${reportId}/not-found`)
      return
    }

    if (report.status === ReportStatus.STARTED) {
      res.redirect(`/${this.path}/${reportId}/defendant-details`)
      return
    }

    this.report = report
    this.updateReport()
    res.render(`${this.path}/${this.templatePath}`, {
      ...this.templateValues,
      reportId,
      data: {
        ...this.defaultTemplateData,
        ...report,
      },
    })
  }
}
