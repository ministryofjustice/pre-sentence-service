import { Router } from 'express'
import ApiController from '../../controllers/api/apiController'
import CommunityService from '../../services/communityService'
import EventService from '../../services/eventService'
import ReportService from '../../services/reportService'

export default function Index(
  reportService: ReportService,
  eventService: EventService,
  communityService: CommunityService
): Router {
  const router = Router()
  const apiHandlers = new ApiController(reportService, eventService, communityService)

  router.get('/v1/report/:id', apiHandlers.getReportById)
  router.get('/v1/report/:id/pdf', apiHandlers.getPdfById)
  router.get('/v1/reports/:reportType', apiHandlers.getAllReportsByType)
  router.post('/v1/report/:reportType', apiHandlers.createReport)

  return router
}
