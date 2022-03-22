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

  router.get('/api/v1/reports/:reportType', async (req, res) => {
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
      await reportService.updateFieldValues([
        {
          reportId: report.id,
          fieldId: reportDefinition.fields.filter(field => field.name === 'crn')[0].id,
          value: req.body.crn,
          version: 1,
        },
      ])
      await eventService.sendReportEvent({
        reportId: report.id,
        entityId: req.body.entityId,
        crn: req.body.crn,
        reportStatus: 'created',
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
