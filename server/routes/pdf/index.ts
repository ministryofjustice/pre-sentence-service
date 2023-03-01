import { RequestHandler, Router } from 'express'
import asyncMiddleware from '../../middleware/asyncMiddleware'
import PdfController from '../../controllers/pdf/pdfController'
import ReportService from '../../services/reportService'

export default function Index(reportService: ReportService): Router {
  const router = Router()

  const get = (path: string, handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  get('/:reportId/pdf', (req, res) => {
    return new PdfController(reportService).renderPdf(req, res)
  })
  get('/:reportId/preview', (req, res) => {
    return new PdfController(reportService).preview(req, res)
  })

  return router
}
