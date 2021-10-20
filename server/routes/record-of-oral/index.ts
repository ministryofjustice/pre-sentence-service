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
import ReportDefinition from '../../repositories/entities/reportDefinition'

export default function Index(reportRepository: Repository<ReportDefinition>): Router {
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
  get('/report-saved', new ReportSavedController().get)
  get('/report-completed', new ReportCompletedController().get)

  get('/questions', async (req, res) => {
    try {
      const results = await reportRepository.find()
      res.json(results)
    } catch (error) {
      res.status(error.status || 500).send(error.message)
    }
  })

  return router
}
