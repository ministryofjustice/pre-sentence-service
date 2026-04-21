import { Request, Response } from 'express'
import logger from '../../../logger'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import ReportService from '../../services/reportService'
import ReportDetails from '../../repositories/entities/reportDetails'
import PdfGenerationService from '../../services/pdfGenerationService'

export default class PdfController {
  private pdfGenerationService: PdfGenerationService

  constructor(
    protected readonly reportService: ReportService,
    protected readonly preSentenceToDeliusService?: PreSentenceToDeliusService
  ) {
    this.pdfGenerationService = new PdfGenerationService(preSentenceToDeliusService)
  }

  renderPdf = async (req: Request, res: Response, draft: boolean): Promise<void> => {
    const { reportId } = req.params

    const report: ReportDetails | null = await this.reportService.getReportById(reportId)

    if (report) {
      await this.pdfGenerationService.generatePdf(report, res, { draft })
    } else {
      logger.warn(`Report ${reportId} not found`)
      res.redirect(`/${req.params.reportId}/not-found`)
    }
  }
}
