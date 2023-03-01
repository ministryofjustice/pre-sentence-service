import { Router } from 'express'
import ApiController from '../../controllers/api/apiController'
import EventService from '../../services/eventService'
import ReportService from '../../services/reportService'

export default function Index(reportService: ReportService, eventService: EventService): Router {
  const router = Router()

  router.get('/v1/report/:id', (req, res) => {
    return new ApiController(reportService, eventService).getReportById(req, res)
  })
  router.get('/v1/report/:id/pdf', (req, res) => {
    return new ApiController(reportService, eventService).getPdfById(req, res)
  })
  router.get('/v1/reports/:reportType', (req, res) => {
    return new ApiController(reportService, eventService).getAllReportsByType(req, res)
  })
  router.post('/v1/report/:reportType', (req, res) => {
    return new ApiController(reportService, eventService).createReport(req, res)
  })

  return router
}
