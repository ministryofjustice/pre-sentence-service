import BaseController from './baseController'
import { sentencingProposalModel } from '../../schemas/sentencing-proposal'

export const pageFields: Array<string> = [
  'pnc',
  'offencesUnderConsideration',
  'offencesPattern',
  'proposedSentence',
  'proposedSentenceRationale',
  'alternativeSentencingOptions',
  'custodialSentenceConsideration',
  'custodialSentenceImpact',
]

export default class SentencingProposalController extends BaseController {
  override templatePath = 'sentencing-proposal'

  override redirectPath = 'sources-of-information'

  override pageFields = pageFields

  override model = sentencingProposalModel
}
