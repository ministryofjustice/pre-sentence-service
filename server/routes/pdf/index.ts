import { RequestHandler, Router } from 'express'
import asyncMiddleware from '../../middleware/asyncMiddleware'
import PdfController from '../../controllers/pdf/pdfController'
import ReportService from '../../services/reportService'

export default function Index(reportService: ReportService): Router {
  const router = Router()

  const get = (path: string, handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  get('/:reportId/pdf', new PdfController(reportService).renderPdf)
  get('/:reportId/preview', new PdfController(reportService).preview)

  return router
}
