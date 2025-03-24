import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export const pageFields: Array<string> = ['offenceAnalysis', 'patternOfOffendingBehaviour']

export default class OffenceAnalysisController extends BaseController {
  override templatePath = 'offence-analysis'

  override redirectPath = 'offender-assessment'

  override pageFields = pageFields

  override formValidation: FormValidation = {
    required: [
      {
        id: 'offenceAnalysis',
        errorMessage: 'Enter your analysis of the offence',
      },
      {
        id: 'patternOfOffendingBehaviour',
        errorMessage: 'Enter the patterns of offending behaviour',
      },
    ],
  }
}
