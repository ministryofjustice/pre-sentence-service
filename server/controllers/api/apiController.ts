import { Request, Response } from 'express'
import ReportService from '../../services/reportService'
import EventService from '../../services/eventService'
import config from '../../config'
import { configureReportData, getFooter, getHeader, pdfOptions } from '../../utils/pdfFormat'
import { HttpError } from '../../@types/httpError'
import { ReportStatus } from '../../repositories/entities/reportDetails'

export default class ApiController {
  constructor(
    protected readonly reportService: ReportService,
    protected readonly eventService: EventService
  ) {}

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
    let reportId: string | undefined
    try {
      const reportType = this.correctReportType(req.params.reportType)
      const username = res.locals?.user?.username || 'system'

      // Create person details from request body
      const personDetails = {
        crn: req.body.crn.toUpperCase(),
        names: req.body.names || {
          foreName: '',
          middleName: '',
          surname: '',
        },
        dateOfBirth: req.body.dateOfBirth ? new Date(req.body.dateOfBirth) : new Date(),
        pnc: req.body.pnc || '',
        address: req.body.address,
        mainOffence: req.body.mainOffence || '',
        otherOffences: req.body.otherOffences,
        court: req.body.court || {
          name: '',
          localJusticeArea: '',
        },
        createdBy: username,
      }

      const report = await this.reportService.createReport(
        {
          crn: req.body.crn.toUpperCase(),
          eventNumber: req.body.eventNumber.toString(),
          reportType,
          personDetails,
        },
        username
      )

      reportId = report.id

      await this.eventService.sendReportEvent({
        reportId: report.id.toString(),
        eventNumber: req.body.eventNumber.toString(),
        crn: req.body.crn.toUpperCase(),
        reportStatus: 'started',
      })

      res.status(201).json({
        ...report,
        id: report.id.toString(), // Convert to string for API compatibility
        urn: `uk:gov:hmpps:pre-sentence-service:report:${report.id}`,
        url: `${config.domain}/${reportType}/${report.id}`,
      })
    } catch (e) {
      const error = e as HttpError
      if (reportId) {
        await this.reportService.deleteReport(reportId)
      }
      res.status(error.status || 500).send(error.message)
    }
  }

  getReportById = async (req: Request, res: Response): Promise<void> => {
    try {
      const reportId = req.params.id

      const report = await this.reportService.getReportById(reportId)
      if (!report) {
        res.status(404).json({ error: 'Report not found' })
        return
      }

      res.json({
        ...report,
        id: report.id.toString(), // Convert to string for API compatibility
      })
    } catch (e) {
      const error = e as HttpError
      res.status(error.status || 500).send(error.message)
    }
  }

  getPdfById = async (req: Request, res: Response): Promise<void> => {
    try {
      const reportId = req.params.id

      const report = await this.reportService.getReportById(reportId)
      if (!report) {
        res.status(404).json({ error: 'Report not found' })
        return
      }

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
    } catch (e) {
      const error = e as HttpError
      res.status(error.status || 500).send(error.message)
    }
  }

  getAllReportsByType = async (req: Request, res: Response): Promise<void> => {
    try {
      const reportType = this.correctReportType(req.params.reportType)
      const results = await this.reportService.getAllReportsByType(reportType)

      // Convert IDs to strings for API compatibility
      const formattedResults = results.map(report => ({
        ...report,
        id: report.id.toString(),
      }))

      res.json({
        request: req.params.reportType,
        found: results && results.length,
        results: formattedResults,
      })
    } catch (e) {
      const error = e as HttpError
      res.status(error.status || 500).send(error.message)
    }
  }

  save = async (req: Request, res: Response): Promise<void> => {
    try {
      const reportId = req.params.id

      const report = await this.reportService.getReportById(reportId)

      if (!report) {
        res.status(404).json({ error: 'Report not found' })
        return
      }

      // Update report status if needed
      if (report.status === ReportStatus.NOT_STARTED) {
        await this.reportService.updateReport(reportId, { status: ReportStatus.STARTED })
      } else {
        await this.reportService.updateReport(reportId, {})
      }

      // Get page name from request body or query param, fallback to extracting from referer
      let pageName = req.body.pageName || req.query.pageName

      if (!pageName && req.headers.referer) {
        // Extract page name from referer URL and match it to template naming
        // E.g., /psr/123/defendant-details -> psr-defendant-details (matches template)
        // E.g., /psr/123/risk-analysis -> risk-analysis (matches template)
        const urlMatch = req.headers.referer.match(/\/psr\/[^/]+\/([^/?]+)/)
        if (urlMatch) {
          const urlPageName = urlMatch[1]
          // defendant-details and defendant-behaviour pages use psr- prefix in templates
          if (urlPageName === 'defendant-details' || urlPageName === 'defendant-behaviour') {
            pageName = `psr-${urlPageName}`
          } else {
            pageName = urlPageName
          }
        }
      }

      // If still no page name, use 'default' as fallback
      if (!pageName) {
        pageName = 'default'
      }

      const fieldValues = []
      let questionId = 0
      for (const [key, value] of Object.entries(req.body)) {
        if (
          value !== undefined &&
          key !== 'action' &&
          key !== 'pageName' &&
          key !== 'CSRFToken' &&
          key !== 'reportId'
        ) {
          fieldValues.push({
            pageName,
            questionId: questionId++,
            questionValue: key,
            answer: Array.isArray(value) ? value.join(',') : String(value),
          })
        }
      }

      if (fieldValues.length > 0) {
        await this.reportService.updateFieldValues(reportId, fieldValues)
      }

      res.status(200).json({ success: true, message: 'Report saved successfully' })
    } catch (e) {
      const error = e as HttpError
      res.status(error.status || 500).json({ error: error.message || 'Failed to save report' })
    }
  }
}
