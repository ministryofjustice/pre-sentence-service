import { RequestHandler, Router } from 'express'

import asyncMiddleware from '../../middleware/asyncMiddleware'
import BaseController from '../../controllers/psr/baseController'
import LandingPageController from '../../controllers/psr/landingPageController'

import ReportService from '../../services/reportService'
import DefendantDetailsController from '../../controllers/psr/defendant-details-controller'
import OffenceAnalysisController from '../../controllers/psr/offence-analysis-controller'
import RiskAnalysisController from '../../controllers/psr/risk-analysis-controller'
import DefendantBehaviourController from '../../controllers/psr/defendant-behaviour-controller'
import SentencingProposalController from '../../controllers/psr/sentencing-proposal-controller'
import PreviewReportController from '../../controllers/psr/preview-report-controller'

export default function Index(reportService: ReportService): Router {
  const router = Router()
  const routePrefix = (path: string) => `/${new BaseController(reportService, null as any).path}${path}`
  const get = (path: string, handler: RequestHandler) => router.get(routePrefix(path), asyncMiddleware(handler))
  const post = (path: string, handler: RequestHandler) => router.post(routePrefix(path), asyncMiddleware(handler))

  get('/:reportId', (req, res) => {
    return new LandingPageController(reportService, null as any).get(req, res)
  })

  get('/:reportId/defendant-details', (req, res) => {
    return new DefendantDetailsController(reportService, null as any).get(req, res)
  })
  post('/:reportId/defendant-details', (req, res) => {
    return new DefendantDetailsController(reportService, null as any).post(req, res)
  })

  get('/:reportId/offence-analysis', (req, res) => {
    return new OffenceAnalysisController(reportService, null as any).get(req, res)
  })
  post('/:reportId/offence-analysis', (req, res) => {
    return new OffenceAnalysisController(reportService, null as any).post(req, res)
  })

  get('/:reportId/risk-analysis', (req, res) => {
    return new RiskAnalysisController(reportService, null as any).get(req, res)
  })
  post('/:reportId/risk-analysis', (req, res) => {
    return new RiskAnalysisController(reportService, null as any).post(req, res)
  })

  get('/:reportId/defendant-behaviour', (req, res) => {
    return new DefendantBehaviourController(reportService, null as any).get(req, res)
  })

  post('/:reportId/defendant-behaviour', (req, res) => {
    return new DefendantBehaviourController(reportService, null as any).post(req, res)
  })

  get('/:reportId/sentencing-proposal', (req, res) => {
    return new SentencingProposalController(reportService, null as any).get(req, res)
  })
  post('/:reportId/sentencing-proposal', (req, res) => {
    return new SentencingProposalController(reportService, null as any).post(req, res)
  })

  get('/:reportId/preview-report', (req, res) => {
    return new PreviewReportController(reportService, null as any).get(req, res)
  })
  post('/:reportId/preview-report', (req, res) => {
    return new PreviewReportController(reportService, null as any).post(req, res)
  })

  return router
}
