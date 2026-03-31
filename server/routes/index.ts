import type { RequestHandler, Router } from 'express'

import asyncMiddleware from '../middleware/asyncMiddleware'
import ReportService from '../services/reportService'

export default function routes(router: Router): Router {
  const reportService = new ReportService()
  const get = (path: string, handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  get('/', async (req, res, next) => {
    const page = parseInt(req.query.page as string) || 1
    const limit = 20

    const { reports, total, totalPages, currentPage } = await reportService.getAllReportsPaginated(page, limit)

    res.render('pages/index', {
      reports,
      pagination: {
        currentPage,
        totalPages,
        total,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      },
    })
  })

  return router
}
