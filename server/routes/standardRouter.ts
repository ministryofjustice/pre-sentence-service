import { Router } from 'express'
import { csrfSynchronisedProtection } from '../utils/csrf'

import auth from '../authentication/auth'
import config from '../config'

import tokenVerifier from '../data/tokenVerification'
import setUpAuthentication from '../middleware/setUpAuthentication'
import authorisationMiddleware from '../middleware/authorisationMiddleware'
import populateCurrentUser from '../middleware/populateCurrentUser'
import psrRoutes from './psr'

import type UserService from '../services/userService'
import ReportService from '../services/reportService'
import PreSentenceToDeliusService from '../services/preSentenceToDeliusService'
import DomainEventService from '../services/domainEventService'
import HmppsAuthClient from '../data/hmppsAuthClient'
import { createRedisClient } from '../data/redisClient'
import TokenStore from '../data/tokenStore'
import logger from '../../logger'

const testMode = process.env.NODE_ENV === 'test'

export default function standardRouter(userService: UserService): Router {
  const router = Router({ mergeParams: true })
  const reportService = new ReportService()

  logger.info('StandardRouter: Initializing services for PSR routes')

  // Initialize PreSentenceToDeliusService
  const hmppsAuthClient = new HmppsAuthClient(new TokenStore(createRedisClient({ legacyMode: false })))
  const preSentenceToDeliusService = new PreSentenceToDeliusService(hmppsAuthClient)

  // Initialize DomainEventService
  logger.info('StandardRouter: Creating DomainEventService instance')
  const domainEventService = new DomainEventService()
  logger.info('StandardRouter: DomainEventService instance created, passing to PSR routes')

  if (!testMode) {
    router.use(setUpAuthentication())
    router.use(authorisationMiddleware())
    router.use(auth.authenticationMiddleware(tokenVerifier))
    router.use(csrfSynchronisedProtection)
  }

  router.use((req, res, next) => {
    res.locals.nonce = config.nonce
    if (typeof req.csrfToken === 'function') {
      res.locals.csrfToken = req.csrfToken()
    }
    next()
  })

  router.use(populateCurrentUser(userService))
  router.use(psrRoutes(reportService, preSentenceToDeliusService, domainEventService))

  return router
}
