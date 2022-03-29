import { Request, Response } from 'express'
import { getFooter, getHeader, pdfOptions } from '../../utils/pdfFormat'
import logger from '../../../logger'
import config from '../../config'
import ReportService from '../../services/reportService'
import Report from '../../repositories/entities/report'

export default class PdfController {
  constructor(protected readonly reportService: ReportService = null) {}

  private configureReportData(report: Report) {
    const reportData = {
      reportStatus: report.status,
      reportType: report.reportDefinition.type,
      reportVersion: report.reportDefinition.version,
    }
    report.fieldValues.forEach(value => {
      reportData[value.field.name] = value.value
    })
    return reportData
  }

  preview = async (req: Request, res: Response): Promise<void> => {
    const { reportId } = req.params
    const report: Report = await this.reportService.getReportById(reportId)
    if (report) {
      const reportData = { ...this.configureReportData(report), preview: true }
      const headerHtml = getHeader()
      const footerHtml = getFooter({ version: reportData.reportVersion })
      logger.info(`Request to preview ${reportData.reportType} report ${reportId}`)
      res.render(`reports/${reportData.reportType}`, { data: reportData, headerHtml, footerHtml })
    } else {
      res.redirect(`/${req.params.reportId}/not-found`)
    }
  }

  renderPdf = async (req: Request, res: Response): Promise<void> => {
    const { reportId } = req.params
    const report: Report = await this.reportService.getReportById(reportId)
    logger.info(`Request to print PDF for report ${reportId}`)

    if (report) {
      const reportData = this.configureReportData(report)
      const headerHtml = getHeader()
      const footerHtml = getFooter({ version: reportData.reportVersion })
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
