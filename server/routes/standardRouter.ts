import { Router } from 'express'
import csurf from 'csurf'
import { InsertResult } from 'typeorm'
import auth from '../authentication/auth'
import tokenVerifier from '../data/tokenVerification'
import populateCurrentUser from '../middleware/populateCurrentUser'
import type UserService from '../services/userService'
import config from '../config'
import shortFormatRoutes from './short-format'
import recordOfOralRoutes from './record-of-oral'
import pdfRoutes from './pdf'

import ReportService, { IReport } from '../services/reportService'

const testMode = process.env.NODE_ENV === 'test'

export default function standardRouter(userService: UserService, reportService: ReportService): Router {
  const router = Router({ mergeParams: true })

  router.use((req, res, next) => {
    res.locals.nonce = config.nonce
    next()
  })

  router.use(auth.authenticationMiddleware(tokenVerifier))
  router.use(populateCurrentUser(userService))
  router.use(shortFormatRoutes(reportService))
  router.use(recordOfOralRoutes(reportService))
  router.use(pdfRoutes())

  // @FIXME: Implemented to debug created reports. Remove this after completing data integration
  router.get('/reports/:reportType', async (req, res) => {
    try {
      const results = await reportService.getAllReportsByType(req.params.reportType)
      res.json({
        request: req.params.reportType,
        found: results && results.length,
        results,
      })
    } catch (error) {
      res.status(error.status || 500).send(error.message)
    }
  })

  router.get('/api/v1/report/:id', async (req, res) => {
    try {
      const report = await reportService.getReportById(req.params.id)
      res.json(report)
    } catch (error) {
      res.status(error.status || 500).send(error.message)
    }
  })

  router.post('/api/v1/report/:reportType', async (req, res) => {
    try {
      const reportDefinition = await reportService.getDefinitionByType(req.params.reportType)
      const report = await reportService.createReport({
        ...req.body,
        reportDefinitionId: reportDefinition.id,
      })
      res.json(report)
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
