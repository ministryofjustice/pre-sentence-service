import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export const pageFields: Array<string> = ['sourcesOfInformation', 'otherSourceOfInformation']

export default class SourcesOfInformationController extends BaseController {
  override templatePath = 'sources-of-information'

  override redirectPath = 'check-report'

  override pageFields = pageFields

  override formValidation: FormValidation = {
    required: [
      {
        id: 'sourcesOfInformation',
        errorMessage: 'Select the relevant options',
      },
    ],
  }
}
