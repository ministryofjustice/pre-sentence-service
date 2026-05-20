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

  protected async redirectOnGet(req: Request, res: Response): Promise<boolean> {
    if (this.report?.status === ReportStatus.STARTED) {
      res.redirect(`/${this.path}/${req.params.reportId}/defendant-details`)
      return true
    }

    return false
  }
}
