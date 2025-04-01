import { RequestHandler, Router } from 'express'

import asyncMiddleware from '../../middleware/asyncMiddleware'
import BaseController from '../../controllers/psr/baseController'
import LandingPageController from '../../controllers/psr/landingPageController'

import ReportService from '../../services/reportService'
import CommunityService from '../../services/communityService'
import EventService from '../../services/eventService'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import DefendantDetailsController from '../../controllers/psr/defendant-details-controller'

export default function Index(
  reportService: ReportService,
  communityService: CommunityService,
  _eventService: EventService,
  preSentenceToDeliusService: PreSentenceToDeliusService
): Router {
  const router = Router()
  const routePrefix = (path: string) => `/${new BaseController().path}${path}`
  const get = (path: string, handler: RequestHandler) => router.get(routePrefix(path), asyncMiddleware(handler))

  get('/:reportId', (req, res) => {
    return new LandingPageController(reportService, communityService, null, preSentenceToDeliusService).get(req, res)
  })

  get('/:reportId/defendant-details', (req, res) => {
    return new DefendantDetailsController(reportService, communityService).get(req, res)
  })

  return router
}
