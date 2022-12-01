import { RequestHandler, Router } from 'express'

import asyncMiddleware from '../../middleware/asyncMiddleware'

import AutoSaveController from '../../controllers/shared/autoSaveController'
import BaseController from '../../controllers/record-of-oral/baseController'
import LandingPageController from '../../controllers/record-of-oral/landingPageController'
import OffenderDetailsController from '../../controllers/record-of-oral/offenderDetailsController'
import OffenceDetailsController from '../../controllers/record-of-oral/offenceDetailsController'
import CourtDetailsController from '../../controllers/record-of-oral/courtDetailsController'
import OffenceAnalysisController from '../../controllers/record-of-oral/offenceAnalysisController'
import OffenderAssessmentController from '../../controllers/record-of-oral/offenderAssessmentController'
import RiskAssessmentController from '../../controllers/record-of-oral/riskAssessmentController'
import ProposalController from '../../controllers/record-of-oral/proposalController'
import SourcesOfInformationController from '../../controllers/record-of-oral/sourcesOfInformationController'
import CheckReportController from '../../controllers/record-of-oral/checkReportController'
import SignReportController from '../../controllers/record-of-oral/signReportController'
import ReportSavedController from '../../controllers/record-of-oral/reportSavedController'
import ReportCompletedController from '../../controllers/record-of-oral/reportCompletedController'

import ReportService from '../../services/reportService'
import EventService from '../../services/eventService'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'

export default function Index(
  reportService: ReportService,
  eventService: EventService,
  preSentenceToDeliusService: PreSentenceToDeliusService
): Router {
  const router = Router()
  const routePrefix = (path: string) => `/${new BaseController().path}${path}`

  const get = (path: string, handler: RequestHandler) => router.get(routePrefix(path), asyncMiddleware(handler))
  const post = (path: string, handler: RequestHandler) => router.post(routePrefix(path), asyncMiddleware(handler))
  const getAndPost = (path: string, handler: BaseController) => {
    get(path, handler.get)
    post(path, handler.post)
  }

  router.get('/oralReport/:reportId/:section?', (req, res) => {
    const { reportId, section } = req.params
    res.redirect(301, `/record-of-oral/${reportId}${section ? `/${section}` : ''}`)
  })

  get('/:reportId', new LandingPageController(reportService, null, preSentenceToDeliusService).get)

  getAndPost('/:reportId/offender-details', new OffenderDetailsController(reportService))
  getAndPost('/:reportId/court-details', new CourtDetailsController(reportService))
  getAndPost('/:reportId/offence-details', new OffenceDetailsController(reportService))
  getAndPost('/:reportId/offence-analysis', new OffenceAnalysisController(reportService))
  getAndPost('/:reportId/offender-assessment', new OffenderAssessmentController(reportService))
  getAndPost('/:reportId/risk-assessment', new RiskAssessmentController(reportService))
  getAndPost('/:reportId/proposal', new ProposalController(reportService))
  getAndPost('/:reportId/sources-of-information', new SourcesOfInformationController(reportService))
  getAndPost('/:reportId/sign-report', new SignReportController(reportService, eventService))

  get('/:reportId/check-report', new CheckReportController(reportService).get)
  get('/:reportId/report-saved', new ReportSavedController(reportService).get)
  get('/:reportId/report-completed', new ReportCompletedController(reportService).get)

  post('/:reportId/auto-save', new AutoSaveController(reportService).post)

  return router
}
