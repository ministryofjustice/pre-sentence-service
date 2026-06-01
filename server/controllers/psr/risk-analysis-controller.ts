import BaseController from './baseController'
import { riskAnalysisModel } from '../../schemas/risk-analysis'

export const pageFields: Array<string> = [
  'pnc',
  'crn',
  'name',
  'riskPredictors',
  'riskAndHarmFactors',
  'riskToChildren',
  'riskToPublic',
  'riskToKnownAdults',
  'riskToStaff',
]

export default class RiskAnalysisController extends BaseController {
  override templatePath = 'risk-analysis'

  override redirectPath = 'sentencing-proposal'

  override pageFields = pageFields

  override model = riskAnalysisModel
}
