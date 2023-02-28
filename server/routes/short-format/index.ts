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
import CommunityService from '../../services/communityService'
import EventService from '../../services/eventService'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'

export default function Index(
  reportService: ReportService,
  communityService: CommunityService,
  eventService: EventService,
  preSentenceToDeliusService: PreSentenceToDeliusService
): Router {
  const router = Router()
  const routePrefix = (path: string) => `/${new BaseController().path}${path}`
  const get = (path: string, handler: RequestHandler) => router.get(routePrefix(path), asyncMiddleware(handler))
  const post = (path: string, handler: RequestHandler) => router.post(routePrefix(path), asyncMiddleware(handler))

  router.get('/shortFormatPreSentenceReport/:reportId/:section?', (req, res) => {
    const { reportId, section } = req.params
    res.redirect(301, `/short-format/${reportId}${section ? `/${section}` : ''}`)
  })

  get('/:reportId', new LandingPageController(reportService, communityService, null, preSentenceToDeliusService).get)
  get('/:reportId/offender-details', new OffenderDetailsController(reportService, communityService).get)
  get('/:reportId/court-details', new CourtDetailsController(reportService, communityService).get)
  get('/:reportId/offence-details', new OffenceDetailsController(reportService, communityService).get)
  get('/:reportId/offence-analysis', new OffenceAnalysisController(reportService, communityService).get)
  get('/:reportId/offender-assessment', new OffenderAssessmentController(reportService, communityService).get)
  get('/:reportId/risk-assessment', new RiskAssessmentController(reportService, communityService).get)
  get('/:reportId/proposal', new ProposalController(reportService, communityService).get)
  get('/:reportId/sources-of-information', new SourcesOfInformationController(reportService, communityService).get)
  get('/:reportId/sign-report', new SignReportController(reportService, communityService, eventService).get)
  get('/:reportId/check-report', new CheckReportController(reportService, communityService).get)
  get('/:reportId/report-saved', new ReportSavedController(reportService, communityService).get)
  get('/:reportId/report-completed', new ReportCompletedController(reportService, communityService).get)

  post('/:reportId/offender-details', new OffenderDetailsController(reportService, communityService).post)
  post('/:reportId/court-details', new CourtDetailsController(reportService, communityService).post)
  post('/:reportId/offence-details', new OffenceDetailsController(reportService, communityService).post)
  post('/:reportId/offence-analysis', new OffenceAnalysisController(reportService, communityService).post)
  post('/:reportId/offender-assessment', new OffenderAssessmentController(reportService, communityService).post)
  post('/:reportId/risk-assessment', new RiskAssessmentController(reportService, communityService).post)
  post('/:reportId/proposal', new ProposalController(reportService, communityService).post)
  post('/:reportId/sources-of-information', new SourcesOfInformationController(reportService, communityService).post)
  post('/:reportId/sign-report', new SignReportController(reportService, communityService, eventService).post)
  post('/:reportId/auto-save', new AutoSaveController(reportService, communityService).post)

  return router
}
