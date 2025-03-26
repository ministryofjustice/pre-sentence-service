import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export const pageFields: Array<string> = ['mainOffence', 'otherOffences', 'offenceSummary']

export default class OffenceDetailsController extends BaseController {
  override templatePath = 'offence-details'

  override redirectPath = 'offence-analysis'

  override pageFields = pageFields

  override formValidation: FormValidation = {
    required: [
      {
        id: 'mainOffence',
        errorMessage: 'Enter the main offence and date',
      },
      {
        id: 'offenceSummary',
        errorMessage: 'Enter a brief summary of the offence',
      },
    ],
  }
}
