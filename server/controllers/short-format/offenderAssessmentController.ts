import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export default class OffenderAssessmentController extends BaseController {
  override templatePath = 'offender-assessment'

  override redirectPath = 'risk-assessment'

  override formValidation: FormValidation = {
    required: [
      {
        id: 'experienceTrauma',
        errorMessage: 'Select whether there is evidence of the offender experiencing trauma',
      },
      {
        id: 'caringResponsibilities',
        errorMessage:
          'Select whether the offender has caring responsibilities for children or adults, or have they ever had caring responsibilities for children or adults',
      },
    ],
  }
}
