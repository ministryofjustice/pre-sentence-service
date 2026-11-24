import { Request, Response } from 'express'
import ReportService from '../../services/reportService'
import { ReportStatus } from '../../repositories/entities/reportDetails'

export default class LockedReportController {
  constructor(private readonly reportService: ReportService) {}

  get = async (req: Request<{ reportId: string }>, res: Response): Promise<void> => {
    const { reportId } = req.params
    const report = await this.reportService.getReportByIdIncludingDeleted(reportId)

    if (report && !report.isDeleted && report.status === ReportStatus.LOCKED) {
      res.render('psr/report-locked', { reportId })
      return
    }

    res.redirect(`/psr/${reportId}`)
  }
}
