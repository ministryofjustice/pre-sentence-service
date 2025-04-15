import BaseController from './baseController'

export const pageFields: Array<string> = ['pnc']

export default class RiskAnalysisController extends BaseController {
  override templatePath = 'risk-analysis'

  override pageFields = pageFields
}
