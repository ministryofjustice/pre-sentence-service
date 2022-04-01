import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export const pageFields: Array<string> = ['equalityAndDiversity', 'proposal']

export default class ProposalController extends BaseController {
  override templatePath = 'proposal'

  override redirectPath = 'sources-of-information'

  override formValidation: FormValidation = {
    required: [
      {
        id: 'equalityAndDiversity',
        errorMessage:
          'Confirm that equalities and diversity information has been considered as part of preparing the report and proposal',
      },
      {
        id: 'proposal',
        errorMessage: 'Enter a proposed sentence',
      },
    ],
  }

  override pageFields = pageFields
}
