import { RequestHandler, Router } from 'express'
import asyncMiddleware from '../../middleware/asyncMiddleware'
import PdfRoutes from '../../controllers/pdf/pdf'

export default function Index(): Router {
  const router = Router()

  const get = (path: string, handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  const pdfHandlers = new PdfRoutes()

  get('/report/:reportType/:id/pdf', pdfHandlers.renderPdf)
  get('/report/:reportType/:id/preview', pdfHandlers.preview)

  return router
}
