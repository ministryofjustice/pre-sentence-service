import { Request, Response } from 'express'
import ReportService from '../../services/reportService'
import EventService from '../../services/eventService'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import PdfGenerationService from '../../services/pdfGenerationService'
import { HttpError } from '../../@types/httpError'
import { ReportStatus } from '../../repositories/entities/reportDetails'

export default class ApiController {
  private pdfGenerationService: PdfGenerationService

  constructor(
    protected readonly reportService: ReportService,
    protected readonly eventService: EventService,
    protected readonly preSentenceToDeliusService?: PreSentenceToDeliusService
  ) {
    this.pdfGenerationService = new PdfGenerationService(preSentenceToDeliusService)
  }

  createReport = async (req: Request, res: Response): Promise<void> => {
    let reportId: string | undefined
    try {
      const crn = req.body.crn?.toUpperCase()
      if (!crn) {
        res.status(400).send('CRN is required')
        return
      }

      const username = res.locals?.user?.username || 'system'

      const report = await this.reportService.createReport({ crn }, username)

      reportId = report.id

      res.status(201).json({
        id: report.id.toString(),
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

      await this.pdfGenerationService.generatePdf(report, res, { draft: false })
    } catch (e) {
      const error = e as HttpError
      res.status(error.status || 500).send(error.message)
    }
  }

  getAllReportsByType = async (req: Request, res: Response): Promise<void> => {
    try {
      const reportType = req.params.reportType
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
