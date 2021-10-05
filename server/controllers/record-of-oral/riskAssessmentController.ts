import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export default class RiskAssessmentController extends BaseController {
  override templatePath = 'risk-assessment'

  override redirectPath = 'proposal'

  override formValidation: FormValidation = {
    required: [
      {
        id: 'likelihoodTool1',
        errorMessage: 'Enter the tool name',
      },
      {
        id: 'likelihoodLevel1',
        errorMessage: 'Specify the level',
      },
      {
        id: 'likelihoodAssessment',
        errorMessage: 'Enter the assessment',
      },
      {
        id: 'riskOfSeriousHarm',
        errorMessage: 'Specify the risk of serious harm level',
      },
      {
        id: 'roshEvidence',
        errorMessage: 'Enter the evidence for risk level',
      },
      {
        id: 'previousSupervisionResponse',
        errorMessage: 'Specify the Response to previous supervision',
      },
    ],
  }
}
