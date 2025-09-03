import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export const pageFields: Array<string> = ['sourcesOfInformation']

export default class SourcesOfInformationController extends BaseController {
  override templatePath = 'sources-of-information'

  override redirectPath = 'preview-report'

  override formValidation: FormValidation = {
    required: [
      {
        id: 'sourcesOfInformation',
        errorMessage: 'You must select all sources used to inform this report',
      },
    ],
  }

  override pageFields = pageFields
}
