import { Router, Request, Response, NextFunction } from 'express'
import apiRoutes from './api'

import { apiAuthenticationMiddleware, initAuth } from '../authentication/apiAuth'
import ReportService from '../services/reportService'
import EventService from '../services/eventService'
import auth from '../authentication/auth'
import tokenVerifier from '../data/tokenVerification'
import setUpAuthentication from '../middleware/setUpAuthentication'

const testMode = process.env.NODE_ENV === 'test'

// Middleware that allows both JWT and session-based authentication
const hybridAuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const hasCSRFToken = req.headers['x-csrf-token']
  const hasAuthHeader = req.headers.authorization

  if (hasCSRFToken && !hasAuthHeader) {
    return next()
  }

  return apiAuthenticationMiddleware()(req, res, next)
}

export default function apiRouter(): Router {
  const router = Router({ mergeParams: true })
  const eventService = new EventService()
  const reportService = new ReportService()

  if (!testMode) {
    router.use(setUpAuthentication())
    router.use(auth.authenticationMiddleware(tokenVerifier))

    initAuth()
    router.use(hybridAuthenticationMiddleware)
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
