import { RequestHandler, Router } from 'express'

import asyncMiddleware from '../../middleware/asyncMiddleware'
import BaseController from '../../controllers/psr/baseController'
import LandingPageController from '../../controllers/psr/landingPageController'

import ReportService from '../../services/reportService'
import CommunityService from '../../services/communityService'
import EventService from '../../services/eventService'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import DefendantDetailsController from '../../controllers/psr/defendant-details-controller'
import OffenceAnalysisController from '../../controllers/psr/offence-analysis-controller'
import RiskAnalysisController from '../../controllers/psr/risk-analysis-controller'
import DefendantBehaviourController from '../../controllers/psr/defendant-behaviour-controller'
import SentencingProposalController from '../../controllers/psr/sentencing-proposal-controller'

export default function Index(
  reportService: ReportService,
  communityService: CommunityService,
  _eventService: EventService,
  preSentenceToDeliusService: PreSentenceToDeliusService
): Router {
  const router = Router()
  const routePrefix = (path: string) => `/${new BaseController().path}${path}`
  const get = (path: string, handler: RequestHandler) => router.get(routePrefix(path), asyncMiddleware(handler))
  const post = (path: string, handler: RequestHandler) => router.post(routePrefix(path), asyncMiddleware(handler))

  get('/:reportId', (req, res) => {
    return new LandingPageController(reportService, communityService, null, preSentenceToDeliusService).get(req, res)
  })

  get('/:reportId/defendant-details', (req, res) => {
    return new DefendantDetailsController(reportService, communityService).get(req, res)
  })
  post('/:reportId/defendant-details', (req, res) => {
    return new DefendantDetailsController(reportService, communityService).post(req, res)
  })

  get('/:reportId/offence-analysis', (req, res) => {
    return new OffenceAnalysisController(reportService, communityService).get(req, res)
  })
  post('/:reportId/offence-analysis', (req, res) => {
    return new OffenceAnalysisController(reportService, communityService).post(req, res)
  })

  get('/:reportId/risk-analysis', (req, res) => {
    return new RiskAnalysisController(reportService, communityService).get(req, res)
  })

  get('/:reportId/defendant-behaviour', (req, res) => {
    return new DefendantBehaviourController(reportService, communityService).get(req, res)
  })

  post('/:reportId/defendant-behaviour', (req, res) => {
    return new DefendantBehaviourController(reportService, communityService).post(req, res)
  })

  get('/:reportId/sentencing-proposal', (req, res) => {
    return new SentencingProposalController(reportService, communityService).get(req, res)
  })
  post('/:reportId/sentencing-proposal', (req, res) => {
    return new SentencingProposalController(reportService, communityService).get(req, res)
  })

  return router
}
