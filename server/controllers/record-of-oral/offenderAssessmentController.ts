import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export const pageFields: Array<string> = [
  'assessmentFactors',
  'experienceOfTrauma',
  'caringResponsibilities',
  'evidenceForAssessment',
]

export default class OffenderAssessmentController extends BaseController {
  override templatePath = 'offender-assessment'

  override redirectPath = 'risk-assessment'

  override formValidation: FormValidation = {
    required: [
      {
        id: 'experienceOfTrauma',
        errorMessage: 'Select whether there is evidence of the offender experiencing trauma',
      },
      {
        id: 'caringResponsibilities',
        errorMessage:
          'Select whether the offender has caring responsibilities for children or adults, or have they ever had caring responsibilities for children or adults',
      },
      {
        id: 'evidenceForAssessment',
        errorMessage: 'Enter the evidence for assessment',
      },
    ],
  }

  override pageFields = pageFields
}
