import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export default class OffenceDetailsController extends BaseController {
  override templatePath = 'offence-details'

  override redirectPath = 'offence-analysis'

  override pageFields = ['mainOffence', 'otherOffences']

  override formValidation: FormValidation = {
    required: [
      {
        id: 'mainOffence',
        errorMessage: 'Enter the main offence and date',
      },
    ],
  }
}
