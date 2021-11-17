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
import ReportSavedController from '../../controllers/short-format/reportSavedController'
import ReportCompletedController from '../../controllers/short-format/reportCompletedController'

export default function Index(): Router {
  const router = Router()
  const routePrefix = (path: string) => `/${new BaseController().path}${path}`
  const get = (path: string, handler: RequestHandler) => router.get(routePrefix(path), asyncMiddleware(handler))
  const post = (path: string, handler: RequestHandler) => router.post(routePrefix(path), asyncMiddleware(handler))
  const getAndPost = (path: string, handler: BaseController) => {
    get(path, handler.get)
    post(path, handler.post)
  }

  get('/:reportId', new LandingPageController().get)

  getAndPost('/:reportId/offender-details', new OffenderDetailsController())
  getAndPost('/:reportId/court-details', new CourtDetailsController())
  getAndPost('/:reportId/offence-details', new OffenceDetailsController())
  getAndPost('/:reportId/offence-analysis', new OffenceAnalysisController())
  getAndPost('/:reportId/offender-assessment', new OffenderAssessmentController())
  getAndPost('/:reportId/risk-assessment', new RiskAssessmentController())
  getAndPost('/:reportId/proposal', new ProposalController())
  getAndPost('/:reportId/sources-of-information', new SourcesOfInformationController())
  getAndPost('/:reportId/sign-report', new SignReportController())

  get('/:reportId/check-report', new CheckReportController().get)
  get('/:reportId/report-saved', new ReportSavedController().get)
  get('/:reportId/report-completed', new ReportCompletedController().get)

  return router
}
