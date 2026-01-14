import { Request, Response } from 'express'
import { configureReportData, getFooter, getHeader, pdfOptions } from '../../utils/pdfFormat'
import logger from '../../../logger'
import config from '../../config'
import ReportService from '../../services/reportService'
import ReportDetails from '../../repositories/entities/reportDetails'

export default class PdfController {
  constructor(protected readonly reportService: ReportService) {}

  preview = async (req: Request, res: Response): Promise<void> => {
    const { reportId } = req.params
    const reportIdNumber = parseInt(reportId, 10)
    const report: ReportDetails | null = await this.reportService.getReportById(reportIdNumber)
    if (report) {
      const reportData: { [key: string]: unknown } = { ...configureReportData(report), preview: true }
      const headerHtml = getHeader()
      const footerHtml = getFooter({ version: reportData.reportVersion as string })
      logger.info(`Request to preview ${reportData.reportType} report ${reportId}`)
      res.render(`reports/${reportData.reportType}`, { data: reportData, headerHtml, footerHtml })
    } else {
      res.redirect(`/${req.params.reportId}/not-found`)
    }
  }

  renderPdf = async (req: Request, res: Response): Promise<void> => {
    const { reportId } = req.params
    const reportIdNumber = parseInt(reportId, 10)
    const report: ReportDetails | null = await this.reportService.getReportById(reportIdNumber)
    logger.info(`Request to print PDF for report ${reportId}`)

    if (report) {
      const reportData = configureReportData(report)
      const headerHtml = getHeader()
      const footerHtml = getFooter({ version: reportData.reportVersion as string })
      // Specify preSentenceUrl so that it is used in the NJK template as http://host.docker.internal:3000/assets
      const { preSentenceUrl } = config.apis.gotenberg
      const filename = `${reportData.reportType}_${reportId}.pdf`
      res.renderPDF(
        `reports/${reportData.reportType}`,
        { preSentenceUrl, data: reportData },
        { filename, pdfOptions: { ...pdfOptions, headerHtml, footerHtml } }
      )
    } else {
      res.redirect(`/${req.params.reportId}/not-found`)
    }
  }
}
