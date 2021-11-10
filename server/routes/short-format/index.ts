import { RequestHandler, Router } from 'express'

import asyncMiddleware from '../../middleware/asyncMiddleware'
import LandingPageController from '../../controllers/short-format/landingPageController'
import BaseController from '../../controllers/short-format/baseController'
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

export default function Index(): Router {
  const router = Router()
  const routePrefix = (path: string) => `/${new BaseController().path}${path}`
  const get = (path: string, handler: RequestHandler) => router.get(routePrefix(path), asyncMiddleware(handler))
  const post = (path: string, handler: RequestHandler) => router.post(routePrefix(path), asyncMiddleware(handler))
  const getAndPost = (path: string, handler: BaseController) => {
    get(path, handler.get)
    post(path, handler.post)
  }

  get('', new LandingPageController().get)

  getAndPost('/offender-details', new OffenderDetailsController())
  getAndPost('/court-details', new CourtDetailsController())
  getAndPost('/offence-details', new OffenceDetailsController())
  getAndPost('/offence-analysis', new OffenceAnalysisController())
  getAndPost('/offender-assessment', new OffenderAssessmentController())
  getAndPost('/risk-assessment', new RiskAssessmentController())
  getAndPost('/proposal', new ProposalController())
  getAndPost('/sources-of-information', new SourcesOfInformationController())
  getAndPost('/sign-report', new SignReportController())

  get('/check-report', new CheckReportController().get)

  return router
}
