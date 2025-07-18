import { FormValidation } from '../../utils/formValidation'
import BaseController from './baseController'

export const pageFields: Array<string> = ['name', 'dateOfBirth', 'age', 'crn', 'address', 'pnc', 'defendantBehaviour']

export default class DefendantBehaviourController extends BaseController {
  override templatePath = 'psr-defendant-behaviour'

  override redirectPath = 'sentencing-proposal'

  override formValidation: FormValidation = {
    required: [
      {
        id: 'defendantBehaviour',
        errorMessage: "Assess the defendant's behaviour and lifestyle",
      },
    ],
  }

  override pageFields = pageFields
}
