import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export const pageFields: Array<string> = [
  'likelihoodOfReOffending',
  'riskOfSeriousHarm',
  'responseToPreviousSupervision',
]

export default class RiskAssessmentController extends BaseController {
  override templatePath = 'risk-assessment'

  override redirectPath = 'proposal'

  override pageFields = pageFields

  override formValidation: FormValidation = {
    required: [
      {
        id: 'likelihoodOfReOffending',
        errorMessage: 'Enter the likelihood of further offending',
      },
      {
        id: 'riskOfSeriousHarm',
        errorMessage: 'Specify the risk of serious harm level',
      },
      {
        id: 'responseToPreviousSupervision',
        errorMessage: 'Specify the Response to previous supervision',
      },
    ],
  }
}
