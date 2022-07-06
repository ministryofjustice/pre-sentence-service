import { Router } from 'express'
import apiRoutes from './api'

// import { apiAuthenticationMiddleware, initAuth } from '../authentication/apiAuth'
import ReportService from '../services/reportService'
import EventService from '../services/eventService'

const testMode = process.env.NODE_ENV === 'test'

export default function apiRouter(): Router {
  const router = Router({ mergeParams: true })
  const eventService = new EventService()
  const reportService = new ReportService()

  if (!testMode) {
    // initAuth()
    // router.use(apiAuthenticationMiddleware())
  }

  router.use(apiRoutes(reportService, eventService))

  router.use((req, res, next) => {
    if (typeof req.csrfToken === 'function') {
      res.locals.csrfToken = req.csrfToken()
    }
    next()
  })

  return router
}
