import { Router } from 'express'
import csurf from 'csurf'

import auth from '../authentication/auth'
import config from '../config'

import tokenVerifier from '../data/tokenVerification'
import setUpAuthentication from '../middleware/setUpAuthentication'
import authorisationMiddleware from '../middleware/authorisationMiddleware'
import populateCurrentUser from '../middleware/populateCurrentUser'
import shortFormatRoutes from './short-format'
import recordOfOralRoutes from './record-of-oral'
import pdfRoutes from './pdf'

import type UserService from '../services/userService'
import ReportService from '../services/reportService'
import EventService from '../services/eventService'
import CommunityService from '../services/communityService'
import PreSentenceToDeliusService from '../services/preSentenceToDeliusService'

const testMode = process.env.NODE_ENV === 'test'

export default function standardRouter(
  userService: UserService,
  communityService: CommunityService,
  preSentenceToDeliusService: PreSentenceToDeliusService
): Router {
  const router = Router({ mergeParams: true })
  const eventService = new EventService()
  const reportService = new ReportService()

  if (!testMode) {
    router.use(setUpAuthentication())
    router.use(authorisationMiddleware())
    router.use(auth.authenticationMiddleware(tokenVerifier))
    router.use(csurf())
  }

  router.use((req, res, next) => {
    res.locals.nonce = config.nonce
    res.locals.wproofreader_protocol = config.apis.wproofreader.serviceProtocol
    res.locals.wproofreader_host = config.apis.wproofreader.serviceHost
    res.locals.wproofreader_port = config.apis.wproofreader.servicePort
    if (typeof req.csrfToken === 'function') {
      res.locals.csrfToken = req.csrfToken()
    }
    next()
  })

  router.use(populateCurrentUser(userService))
  router.use(shortFormatRoutes(reportService, eventService, preSentenceToDeliusService, communityService))
  router.use(recordOfOralRoutes(reportService, eventService, preSentenceToDeliusService, communityService))
  router.use(pdfRoutes(reportService))

  return router
}
