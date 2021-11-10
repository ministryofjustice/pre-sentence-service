import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export default class OffenceAnalysisController extends BaseController {
  override templatePath = 'offence-analysis'

  override redirectPath = 'offender-assessment'

  override formValidation: FormValidation = {
    required: [
      {
        id: 'offenceAnalysis',
        errorMessage: 'Enter your analysis of the offence',
      },
      {
        id: 'patternOfOffending',
        errorMessage: 'Enter the patterns of offending behaviour',
      },
    ],
  }
}
