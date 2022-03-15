import { RequestHandler, Router } from 'express'
import asyncMiddleware from '../../middleware/asyncMiddleware'
import PdfRoutes from '../../controllers/pdf/pdf'
import ReportService from '../../services/reportService'

export default function Index(reportService: ReportService): Router {
  const router = Router()

  const get = (path: string, handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  const pdfHandlers = new PdfRoutes(reportService)

  get('/:reportId/pdf', pdfHandlers.renderPdf)
  get('/:reportId/preview', pdfHandlers.preview)

  return router
}
