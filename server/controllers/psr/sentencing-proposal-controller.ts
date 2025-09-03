import BaseController from './baseController'

export const pageFields: Array<string> = [
  'pnc',
  'offencesUnderConsideration',
  'offencesPattern',
  'proposedSentence',
  'proposedSentenceRationale',
  'alternativeSentencingOptions',
  'sentenceImpact',
]

export default class SentencingProposalController extends BaseController {
  override templatePath = 'sentencing-proposal'

  override redirectPath = 'sources-of-information'

  override pageFields = pageFields
}
