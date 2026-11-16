import { Request, Response } from 'express'
import ReportService from '../../services/reportService'
import EventService from '../../services/eventService'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import PdfGenerationService from '../../services/pdfGenerationService'
import { HttpError } from '../../@types/httpError'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

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

  getReportById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
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

  getPdfById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
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

  getAllReportsByType = async (req: Request<{ reportType: string }>, res: Response): Promise<void> => {
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

  lockReport = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const reportId = req.params.id
    if (!UUID_REGEX.test(reportId)) {
      res.status(400).json({ message: 'Invalid report id' })
      return
    }

    try {
      const username = res.locals?.user?.username || 'system'
      await this.reportService.lockReport(reportId, username)
      res.status(200).json({ id: reportId, status: 'LOCKED' })
    } catch (e) {
      const error = e as HttpError
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  unlockReport = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const reportId = req.params.id
    if (!UUID_REGEX.test(reportId)) {
      res.status(400).json({ message: 'Invalid report id' })
      return
    }

    try {
      const username = res.locals?.user?.username || 'system'
      await this.reportService.unlockReport(reportId, username)
      res.status(200).json({ id: reportId, status: 'COMPLETED' })
    } catch (e) {
      const error = e as HttpError
      res.status(error.status || 500).json({ message: error.message })
    }
  }

  deleteReport = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const reportId = req.params.id
    if (!UUID_REGEX.test(reportId)) {
      res.status(400).json({ message: 'Invalid report id' })
      return
    }

    try {
      const username = res.locals?.user?.username || 'system'
      await this.reportService.deleteCompletedReport(reportId, username)
      res.status(200).json({ id: reportId, status: 'DELETED' })
    } catch (e) {
      const error = e as HttpError
      res.status(error.status || 500).json({ message: error.message })
    }
  }
}
