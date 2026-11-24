import { Request, Response } from 'express'
import ReportService from '../../services/reportService'

export default class DeletedReportController {
  constructor(private readonly reportService: ReportService) {}

  get = async (req: Request<{ reportId: string }>, res: Response): Promise<void> => {
    const { reportId } = req.params
    const report = await this.reportService.getReportByIdIncludingDeleted(reportId)

    if (report?.isDeleted) {
      res.render('psr/report-deleted', { reportId })
      return
    }

    res.redirect(`/psr/${reportId}`)
  }
}
