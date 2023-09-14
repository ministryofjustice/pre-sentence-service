import { Request, Response } from 'express'
import ReportService from '../../services/reportService'
import EventService from '../../services/eventService'
import config from '../../config'
import { configureReportData, getFooter, getHeader, pdfOptions } from '../../utils/pdfFormat'

export default class ApiController {
  constructor(protected readonly reportService: ReportService = null, protected readonly eventService: EventService) {}

  // Support legacy nDelius report types
  private correctReportType(reportType: string): string {
    let correctedReportType: string
    switch (reportType) {
      case 'shortFormatPreSentenceReport':
        correctedReportType = 'short-format'
        break
      case 'oralReport':
        correctedReportType = 'record-of-oral'
        break
      default:
        correctedReportType = ''
    }
    return correctedReportType.length ? correctedReportType : reportType
  }

  createReport = async (req: Request, res: Response): Promise<void> => {
    let report
    try {
      const reportType = this.correctReportType(req.params.reportType)
      const reportDefinition = await this.reportService.getDefinitionByType(reportType)
      if (!reportDefinition) {
        res.status(400).end()
        return
      }
      report = await this.reportService.createReport({
        ...req.body,
        eventNumber: req.body.eventNumber.toString(),
        reportDefinitionId: reportDefinition.id,
      })

      const definitionField = reportDefinition.fields.find(field => field.name === 'crn')

      await this.reportService.updateFieldValues([
        {
          reportId: report.id,
          fieldId: definitionField.id,
          value: req.body.crn.toUpperCase(),
          version: 1,
        },
      ])
      await this.eventService.sendReportEvent({
        reportId: report.id,
        eventNumber: req.body.eventNumber.toString(),
        crn: req.body.crn.toUpperCase(),
        reportStatus: 'started',
      })
      res.status(201).json({
        ...report,
        urn: `uk:gov:hmpps:pre-sentence-service:report:${report.id}`,
        url: `${config.domain}/short-format/${report.id}`,
      })
    } catch (error) {
      if (report) {
        await this.reportService.deleteReport(report)
      }
      res.status(error.status || 500).send(error.message)
    }
  }

  getReportById = async (req: Request, res: Response): Promise<void> => {
    try {
      const report = await this.reportService.getReportById(req.params.id)
      res.json(report)
    } catch (error) {
      res.status(error.status || 500).send(error.message)
    }
  }

  getPdfById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const report = await this.reportService.getReportById(id)
      const reportData = configureReportData(report)
      const headerHtml = getHeader()
      const footerHtml = getFooter({ version: reportData.reportVersion })
      // Specify preSentenceUrl so that it is used in the NJK template as http://host.docker.internal:3000/assets
      const { preSentenceUrl } = config.apis.gotenberg
      const filename = `${reportData.reportType}_${id}.pdf`
      res.renderPDF(
        `reports/${reportData.reportType}`,
        { preSentenceUrl, data: reportData },
        { filename, pdfOptions: { ...pdfOptions, headerHtml, footerHtml } }
      )
    } catch (error) {
      res.status(error.status || 500).send(error.message)
    }
  }

  getAllReportsByType = async (req: Request, res: Response): Promise<void> => {
    try {
      const reportType = this.correctReportType(req.params.reportType)
      const results = await this.reportService.getAllReportsByType(reportType)
      res.json({
        request: req.params.reportType,
        found: results && results.length,
        results,
      })
    } catch (error) {
      res.status(error.status || 500).send(error.message)
    }
  }
}
