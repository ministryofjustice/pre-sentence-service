import BaseController from './baseController'

export const pageFields: Array<string> = ['pnc', 'offencesUnderConsideration', 'offencesPattern']

export default class SentencingProposalController extends BaseController {
  override templatePath = 'sentencing-proposal'

  override redirectPath = 'risk-analysis'

  override pageFields = pageFields
}
