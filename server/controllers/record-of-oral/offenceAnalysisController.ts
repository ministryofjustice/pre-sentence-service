import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export const pageFields = ['offenceAnalysis', 'patternOfOffendingBehaviour', 'escalationInSeriousness']

export default class OffenceAnalysisController extends BaseController {
  override templatePath = 'offence-analysis'

  override redirectPath = 'offender-assessment'

  override formValidation: FormValidation = {
    required: [
      {
        id: 'offenceAnalysis',
        errorMessage: 'Provide an analysis of the offence(s), including victim impact',
      },
      {
        id: 'patternOfOffendingBehaviour',
        errorMessage: 'Select whether current offending is part of a pattern of offending behaviour',
      },
      {
        id: 'escalationInSeriousness',
        errorMessage: 'Select whether current offending represents an escalation in seriousness',
      },
    ],
  }

  override pageFields = pageFields
}
