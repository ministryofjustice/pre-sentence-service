import BaseController from './baseController'

export const pageFields: Array<string> = ['pnc', 'offencesUnderConsideration', 'offencesPattern']

export default class OffenceAnalysisController extends BaseController {
  override templatePath = 'offence-analysis'

  override redirectPath = 'risk-analysis'

  override pageFields = pageFields
}
