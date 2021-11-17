import { RequestHandler, Router } from 'express'

import { Repository } from 'typeorm'
import asyncMiddleware from '../../middleware/asyncMiddleware'

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
import Report from '../../repositories/entities/report'

export default function Index(reportRepository: Repository<Report>): Router {
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
