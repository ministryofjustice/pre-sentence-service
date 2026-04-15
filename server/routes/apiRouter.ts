import { Router, Request, Response, NextFunction } from 'express'
import passport from 'passport'
import apiRoutes from './api'

import { initAuth } from '../authentication/apiAuth'
import ReportService from '../services/reportService'
import EventService from '../services/eventService'

const testMode = process.env.NODE_ENV === 'test'

// Middleware that requires JWT authentication for API endpoints
const apiOnlyAuthenticationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Check if Authorization header is present
  if (!req.headers.authorization) {
    res.status(401).json({ error: 'Authorization header required' })
    return
  }

  // Validate the JWT token using passport
  passport.authenticate(
    'jwt',
    { session: false },
    (err: Error | null, jwtPayload: { user_name?: string; sub?: string } | false) => {
      if (err || !jwtPayload) {
        res.status(401).json({ error: 'Invalid or expired token' })
        return
      }

      // Store JWT payload in res.locals for the API controller to access
      res.locals.user = {
        username: jwtPayload.user_name || jwtPayload.sub || 'api-user',
        token: req.headers.authorization?.replace('Bearer ', '') || '',
        authSource: 'jwt',
      }

      next()
    }
  )(req, res, next)
}

export default function apiRouter(): Router {
  const router = Router({ mergeParams: true })
  const eventService = new EventService()
  const reportService = new ReportService()

  if (!testMode) {
    initAuth()
    router.use(apiOnlyAuthenticationMiddleware)
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
