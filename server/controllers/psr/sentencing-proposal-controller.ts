import BaseController from './baseController'

export const pageFields: Array<string> = [
  'pnc',
  'name',
  'crn',
  'proposedSentence',
  'proposedSentenceRationale',
  'alternativeSentencingOptions',
  'sentenceImpact',
]

export default class SentencingProposalController extends BaseController {
  override templatePath = 'sentencing-proposal'

  override redirectPath = 'preview-report'

  override pageFields = pageFields
}
