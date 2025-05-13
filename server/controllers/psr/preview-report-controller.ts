import BaseController from './baseController'

export const pageFields: Array<string> = [
  'name',
  'dateOfBirth',
  'age',
  'crn',
  'address',
  'pnc',
  'criminalDamageDate',
  'woundingDate',
  'assaultDate',
  'possessionOfClassADrugsDate',
  'offenceUnderConsideration',
  'offencePattern',
  'behaviourAndLifestyleAssessment',
  'riskPredictorsAndLikelihoodOfReoffending',
  'relevantRisksAndProtectiveFactors',
  'riskOfHarmForChildren',
  'riskOfHarmForPublic',
  'riskOfHarmForKnownAdults',
  'riskOfHarmForStaff',
  'proposedSentence',
  'rationaleForProposedSentence',
  'alternativeSentencingOptions',
  'impactOfCustodialSentence',
]

export default class PreviewReportController extends BaseController {
  override templatePath = 'preview-report'

  override redirectPath = 'preview-report'

  override pageFields = pageFields
}
