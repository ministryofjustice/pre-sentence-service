import { Router } from 'express'
import csurf from 'csurf'
import { Repository } from 'typeorm'
import auth from '../authentication/auth'
import tokenVerifier from '../data/tokenVerification'
import populateCurrentUser from '../middleware/populateCurrentUser'
import type UserService from '../services/userService'
import config from '../config'
import Report from '../repositories/entities/report'
import shortFormatRoutes from './short-format'
import recordOfOralRoutes from './record-of-oral'
import pdfRoutes from './pdf'

const testMode = process.env.NODE_ENV === 'test'

export default function standardRouter(userService: UserService, reportRepository: Repository<Report>): Router {
  const router = Router({ mergeParams: true })

  router.use((req, res, next) => {
    res.locals.nonce = config.nonce
    next()
  })

  router.use(auth.authenticationMiddleware(tokenVerifier))
  router.use(populateCurrentUser(userService))
  router.use(shortFormatRoutes())
  router.use(recordOfOralRoutes())
  router.use(pdfRoutes())

  // @FIXME: Implemented to debug created reports. Remove this after completing data integration
  router.get('/reports/:reportType', async (req, res) => {
    try {
      const results = await reportRepository.find({
        where: {
          reportDefinition: {
            type: req.params.reportType,
          },
        },
        relations: ['reportDefinition'],
      })
      res.json({
        request: req.params.reportType,
        found: results && results.length,
        results,
      })
    } catch (error) {
      res.status(error.status || 500).send(error.message)
    }
  })

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
