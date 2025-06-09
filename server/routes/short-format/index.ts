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

  router.get('/shortFormatPreSentenceReport/:reportId{/:section}', (req, res) => {
    const { reportId, section } = req.params
    res.redirect(301, `/short-format/${reportId}${section ? `/${section}` : ''}`)
  })

  get('/:reportId', (req, res) => {
    return new LandingPageController(reportService, communityService, null, preSentenceToDeliusService).get(req, res)
  })
  get('/:reportId/offender-details', (req, res) => {
    return new OffenderDetailsController(reportService, communityService).get(req, res)
  })
  get('/:reportId/court-details', (req, res) => {
    return new CourtDetailsController(reportService, communityService).get(req, res)
  })
  get('/:reportId/offence-details', (req, res) => {
    return new OffenceDetailsController(reportService, communityService).get(req, res)
  })
  get('/:reportId/offence-analysis', (req, res) => {
    return new OffenceAnalysisController(reportService, communityService).get(req, res)
  })
  get('/:reportId/offender-assessment', (req, res) => {
    return new OffenderAssessmentController(reportService, communityService).get(req, res)
  })
  get('/:reportId/risk-assessment', (req, res) => {
    return new RiskAssessmentController(reportService, communityService).get(req, res)
  })
  get('/:reportId/proposal', (req, res) => {
    return new ProposalController(reportService, communityService).get(req, res)
  })
  get('/:reportId/sources-of-information', (req, res) => {
    return new SourcesOfInformationController(reportService, communityService).get(req, res)
  })
  get('/:reportId/sign-report', (req, res) => {
    return new SignReportController(reportService, communityService, eventService).get(req, res)
  })
  get('/:reportId/check-report', (req, res) => {
    return new CheckReportController(reportService, communityService).get(req, res)
  })
  get('/:reportId/report-saved', (req, res) => {
    return new ReportSavedController(reportService, communityService).get(req, res)
  })
  get('/:reportId/report-completed', (req, res) => {
    return new ReportCompletedController(reportService, communityService).get(req, res)
  })

  post('/:reportId/offender-details', (req, res) => {
    return new OffenderDetailsController(reportService, communityService).post(req, res)
  })
  post('/:reportId/court-details', (req, res) => {
    return new CourtDetailsController(reportService, communityService).post(req, res)
  })
  post('/:reportId/offence-details', (req, res) => {
    return new OffenceDetailsController(reportService, communityService).post(req, res)
  })
  post('/:reportId/offence-analysis', (req, res) => {
    return new OffenceAnalysisController(reportService, communityService).post(req, res)
  })
  post('/:reportId/offender-assessment', (req, res) => {
    return new OffenderAssessmentController(reportService, communityService).post(req, res)
  })
  post('/:reportId/risk-assessment', (req, res) => {
    return new RiskAssessmentController(reportService, communityService).post(req, res)
  })
  post('/:reportId/proposal', (req, res) => {
    return new ProposalController(reportService, communityService).post(req, res)
  })
  post('/:reportId/sources-of-information', (req, res) => {
    return new SourcesOfInformationController(reportService, communityService).post(req, res)
  })
  post('/:reportId/sign-report', (req, res) => {
    return new SignReportController(reportService, communityService, eventService).post(req, res)
  })
  post('/:reportId/auto-save', (req, res) => {
    return new AutoSaveController(reportService, communityService).post(req, res)
  })

  return router
}
