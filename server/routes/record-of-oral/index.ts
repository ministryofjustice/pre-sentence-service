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

  router.get('/oralReport/:reportId/:section?', (req, res) => {
    const { reportId, section } = req.params
    res.redirect(301, `/record-of-oral/${reportId}${section ? `/${section}` : ''}`)
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
  post('/:reportId/sign-report', new SignReportController(reportService, communityService, eventService).post)
  post('/:reportId/auto-save', new AutoSaveController(reportService, communityService).post)

  return router
}
