import { Request, Response } from 'express'
import ReportService from '../../services/reportService'
import { ReportStatus } from '../../repositories/entities/reportDetails'
import config from '../../config'
import logger from '../../../logger'

export default class EditCompletedReportController {
  constructor(private readonly reportService: ReportService) {}

  get = async (req: Request<{ reportId: string }>, res: Response): Promise<void> => {
    const { reportId } = req.params
    const report = await this.reportService.getReportByIdIncludingDeleted(reportId)

    if (config.features.unlockedSigning && report && !report.isDeleted && report.status === ReportStatus.COMPLETED) {
      const signReportPage = report.pages?.find(page => page.name === 'sign-your-report')
      const signedBy = signReportPage?.questions.find(question => question.value === 'signReportName')?.answer
      res.render('psr/edit-completed', { reportId, signedBy, signedAt: report.submittedAt })
      return
    }

    res.redirect(`/psr/${reportId}`)
  }

  post = async (req: Request<{ reportId: string }>, res: Response): Promise<void> => {
    const { reportId } = req.params

    if (!config.features.unlockedSigning) {
      res.redirect(`/psr/${reportId}`)
      return
    }

    const username = (res.locals?.user?.username as string | undefined) || 'system'

    try {
      await this.reportService.reopenReport(reportId, username)
    } catch (error) {
      logger.warn({ reportId, error }, 'Failed to reopen completed report')
      res.redirect(`/psr/${reportId}`)
      return
    }

    res.redirect(`/psr/${reportId}/defendant-details`)
  }
}
