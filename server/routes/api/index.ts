import { Router } from 'express'
import ApiController from '../../controllers/api/apiController'
import EventService from '../../services/eventService'
import ReportService from '../../services/reportService'

export default function Index(reportService: ReportService, eventService: EventService): Router {
  const router = Router()

  router.get('/v1/report/:id', new ApiController(reportService, eventService).getReportById)
  router.get('/v1/report/:id/pdf', new ApiController(reportService, eventService).getPdfById)
  router.get('/v1/reports/:reportType', new ApiController(reportService, eventService).getAllReportsByType)
  router.post('/v1/report/:reportType', new ApiController(reportService, eventService).createReport)

  return router
}
