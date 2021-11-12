import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export default class RiskAssessmentController extends BaseController {
  override templatePath = 'risk-assessment'

  override redirectPath = 'proposal'

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
        id: 'previousSupervisionResponse',
        errorMessage: 'Specify the Response to previous supervision',
      },
    ],
  }
}
