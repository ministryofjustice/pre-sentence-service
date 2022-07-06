import { Router } from 'express'
import ReportService from '../../services/reportService'
import ApiController from '../../controllers/api/apiController'
import EventService from '../../services/eventService'

export default function Index(reportService: ReportService, eventService: EventService): Router {
  const router = Router()
  const apiHandlers = new ApiController(reportService, eventService)

  router.get('/v1/report/:id', apiHandlers.getReportById)
  router.get('/v1/reports/:reportType', apiHandlers.getAllReportsByType)
  router.post('/v1/report/:reportType', apiHandlers.createReport)

  return router
}
