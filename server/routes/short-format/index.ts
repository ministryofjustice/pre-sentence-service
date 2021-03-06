import { RequestHandler, Router } from 'express'

import asyncMiddleware from '../../middleware/asyncMiddleware'
import AutoSaveController from '../../controllers/shared/autoSaveController'
import BaseController from '../../controllers/short-format/baseController'
import LandingPageController from '../../controllers/short-format/landingPageController'
import OffenderDetailsController from '../../controllers/short-format/offenderDetailsController'
import CourtDetailsController from '../../controllers/short-format/courtDetailsController'
import OffenceDetailsController from '../../controllers/short-format/offenceDetailsController'
import OffenceAnalysisController from '../../controllers/short-format/offenceAnalysisController'
import OffenderAssessmentController from '../../controllers/short-format/offenderAssessmentController'
import RiskAssessmentController from '../../controllers/short-format/riskAssessmentController'
import ProposalController from '../../controllers/short-format/proposalController'
import SourcesOfInformationController from '../../controllers/short-format/sourcesOfInformationController'
import SignReportController from '../../controllers/short-format/signReportController'
import CheckReportController from '../../controllers/short-format/checkReportController'
import ReportSavedController from '../../controllers/short-format/reportSavedController'
import ReportCompletedController from '../../controllers/short-format/reportCompletedController'

import ReportService from '../../services/reportService'
import EventService from '../../services/eventService'

export default function Index(reportService: ReportService, eventService: EventService): Router {
  const router = Router()
  const routePrefix = (path: string) => `/${new BaseController().path}${path}`
  const get = (path: string, handler: RequestHandler) => router.get(routePrefix(path), asyncMiddleware(handler))
  const post = (path: string, handler: RequestHandler) => router.post(routePrefix(path), asyncMiddleware(handler))
  const getAndPost = (path: string, handler: BaseController) => {
    get(path, handler.get)
    post(path, handler.post)
  }

  router.get('/shortFormatPreSentenceReport/:reportId/:section?', (req, res) => {
    const { reportId, section } = req.params
    res.redirect(301, `/short-format/${reportId}${section ? `/${section}` : ''}`)
  })

  get('/:reportId', new LandingPageController(reportService, eventService).get)

  getAndPost('/:reportId/offender-details', new OffenderDetailsController(reportService))
  getAndPost('/:reportId/court-details', new CourtDetailsController(reportService))
  getAndPost('/:reportId/offence-details', new OffenceDetailsController(reportService))
  getAndPost('/:reportId/offence-analysis', new OffenceAnalysisController(reportService))
  getAndPost('/:reportId/offender-assessment', new OffenderAssessmentController(reportService))
  getAndPost('/:reportId/risk-assessment', new RiskAssessmentController(reportService))
  getAndPost('/:reportId/proposal', new ProposalController(reportService))
  getAndPost('/:reportId/sources-of-information', new SourcesOfInformationController(reportService))
  getAndPost('/:reportId/sign-report', new SignReportController(reportService))

  get('/:reportId/check-report', new CheckReportController(reportService).get)
  get('/:reportId/report-saved', new ReportSavedController(reportService, eventService).get)
  get('/:reportId/report-completed', new ReportCompletedController(reportService, eventService).get)

  post('/:reportId/auto-save', new AutoSaveController(reportService).post)

  return router
}
