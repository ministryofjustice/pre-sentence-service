import { RequestHandler, Router } from 'express'

import asyncMiddleware from '../../middleware/asyncMiddleware'
import BaseController from '../../controllers/psr/baseController'
import LandingPageController from '../../controllers/psr/landingPageController'

import ReportService from '../../services/reportService'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import DefendantDetailsController from '../../controllers/psr/defendant-details-controller'
import OffenceAnalysisController from '../../controllers/psr/offence-analysis-controller'
import RiskAnalysisController from '../../controllers/psr/risk-analysis-controller'
import DefendantBehaviourController from '../../controllers/psr/defendant-behaviour-controller'
import SentencingProposalController from '../../controllers/psr/sentencing-proposal-controller'
import PreviewReportController from '../../controllers/psr/preview-report-controller'
import SourcesOfInformationController from '../../controllers/psr/sources-of-information-controller'
import SignYourReportController from '../../controllers/psr/sign-your-report-controller'
import PdfController from '../../controllers/pdf/pdfController'
import SubmitCompletedController from '../../controllers/psr/submit-completed-controller'

export default function Index(
  reportService: ReportService,
  preSentenceToDeliusService?: PreSentenceToDeliusService
): Router {
  const router = Router()
  const routePrefix = (path: string) => `/${new BaseController(reportService).path}${path}`
  const get = (path: string, handler: RequestHandler) => router.get(routePrefix(path), asyncMiddleware(handler))
  const post = (path: string, handler: RequestHandler) => router.post(routePrefix(path), asyncMiddleware(handler))

  get('/:reportId', (req, res) => {
    return new LandingPageController(reportService, preSentenceToDeliusService).get(req, res)
  })

  get('/:reportId/defendant-details', (req, res) => {
    return new DefendantDetailsController(reportService, preSentenceToDeliusService).get(req, res)
  })
  post('/:reportId/defendant-details', (req, res) => {
    return new DefendantDetailsController(reportService, preSentenceToDeliusService).post(req, res)
  })

  get('/:reportId/offence-analysis', (req, res) => {
    return new OffenceAnalysisController(reportService, preSentenceToDeliusService).get(req, res)
  })
  post('/:reportId/offence-analysis', (req, res) => {
    return new OffenceAnalysisController(reportService, preSentenceToDeliusService).post(req, res)
  })

  get('/:reportId/risk-analysis', (req, res) => {
    return new RiskAnalysisController(reportService, preSentenceToDeliusService).get(req, res)
  })
  post('/:reportId/risk-analysis', (req, res) => {
    return new RiskAnalysisController(reportService, preSentenceToDeliusService).post(req, res)
  })

  get('/:reportId/sources-of-information', (req, res) => {
    return new SourcesOfInformationController(reportService, preSentenceToDeliusService).get(req, res)
  })
  post('/:reportId/sources-of-information', (req, res) => {
    return new SourcesOfInformationController(reportService, preSentenceToDeliusService).post(req, res)
  })

  get('/:reportId/sources-of-information/edit', (req, res) => {
    return new SourcesOfInformationController(reportService, preSentenceToDeliusService).get(req, res)
  })
  post('/:reportId/sources-of-information/edit', (req, res) => {
    return new SourcesOfInformationController(reportService, preSentenceToDeliusService).post(req, res)
  })

  get('/:reportId/defendant-behaviour', (req, res) => {
    return new DefendantBehaviourController(reportService, preSentenceToDeliusService).get(req, res)
  })

  post('/:reportId/defendant-behaviour', (req, res) => {
    return new DefendantBehaviourController(reportService, preSentenceToDeliusService).post(req, res)
  })

  get('/:reportId/sentencing-proposal', (req, res) => {
    return new SentencingProposalController(reportService, preSentenceToDeliusService).get(req, res)
  })
  post('/:reportId/sentencing-proposal', (req, res) => {
    return new SentencingProposalController(reportService, preSentenceToDeliusService).post(req, res)
  })

  get('/:reportId/draft-pdf', (req, res) => {
    return new PdfController(reportService).renderPdf(req, res, true)
  })

  get('/:reportId/pdf', (req, res) => {
    return new PdfController(reportService).renderPdf(req, res, false)
  })

  get('/:reportId/preview-report', (req, res) => {
    return new PreviewReportController(reportService, preSentenceToDeliusService).get(req, res)
  })
  post('/:reportId/preview-report', (req, res) => {
    return new PreviewReportController(reportService, preSentenceToDeliusService).post(req, res)
  })

  get('/:reportId/sign-your-report', (req, res) => {
    return new SignYourReportController(reportService).get(req, res)
  })
  post('/:reportId/sign-your-report', (req, res) => {
    return new SignYourReportController(reportService).post(req, res)
  })
  get('/:reportId/submit-completed', (req, res) => {
    return new SubmitCompletedController(reportService).get(req, res)
  })
  post('/:reportId/submit-completed', (req, res) => {
    return new SubmitCompletedController(reportService).post(req, res)
  })

  return router
}
