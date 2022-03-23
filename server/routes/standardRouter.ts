import { Router } from 'express'
import csurf from 'csurf'
import auth from '../authentication/auth'
import tokenVerifier from '../data/tokenVerification'
import populateCurrentUser from '../middleware/populateCurrentUser'
import type UserService from '../services/userService'
import config from '../config'
import shortFormatRoutes from './short-format'
import recordOfOralRoutes from './record-of-oral'
import pdfRoutes from './pdf'
import apiRoutes from './api'

import ReportService from '../services/reportService'
import EventService from '../services/eventService'

const testMode = process.env.NODE_ENV === 'test'

export default function standardRouter(userService: UserService): Router {
  const router = Router({ mergeParams: true })
  const eventService = new EventService()
  const reportService = new ReportService()

  router.use((req, res, next) => {
    res.locals.nonce = config.nonce
    next()
  })

  router.use(auth.authenticationMiddleware(tokenVerifier))
  router.use(populateCurrentUser(userService))
  router.use(shortFormatRoutes(reportService, eventService))
  router.use(recordOfOralRoutes(reportService, eventService))
  router.use(pdfRoutes(reportService))
  router.use(apiRoutes(reportService, eventService))

  // CSRF protection
  if (!testMode) {
    router.use(csurf())
  }

  router.use((req, res, next) => {
    if (typeof req.csrfToken === 'function') {
      res.locals.csrfToken = req.csrfToken()
    }
    next()
  })

  return router
}
