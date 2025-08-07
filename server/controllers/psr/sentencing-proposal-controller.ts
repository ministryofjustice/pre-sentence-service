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

  override redirectPath = 'preview-report' // TODO: replace with correct page when it is created

  override pageFields = pageFields
}
