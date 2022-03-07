import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export default class RiskAssessmentController extends BaseController {
  override templatePath = 'risk-assessment'

  override redirectPath = 'proposal'

  override formValidation: FormValidation = {
    required: [
      {
        id: 'assessmentTool1',
        errorMessage: 'Enter the tool name',
      },
      {
        id: 'assessmentLevel1',
        errorMessage: 'Specify the level',
      },
      {
        id: 'yourAssessment',
        errorMessage: 'Enter the assessment',
      },
      {
        id: 'riskOfSeriousHarm',
        errorMessage: 'Specify the risk of serious harm level',
      },
      {
        id: 'evidenceForRiskLevel',
        errorMessage: 'Enter the evidence for risk level',
      },
      {
        id: 'responseToPreviousSupervision',
        errorMessage: 'Specify the Response to previous supervision',
      },
    ],
  }

  override pageFields = [
    'assessmentTool1',
    'assessmentLevel1',
    'assessmentTool2',
    'assessmentLevel2',
    'assessmentTool3',
    'assessmentLevel3',
    'assessmentTool4',
    'assessmentLevel4',
    'yourAssessment',
    'riskOfSeriousHarm',
    'evidenceForRiskLevel',
    'responseToPreviousSupervision',
  ]
}
