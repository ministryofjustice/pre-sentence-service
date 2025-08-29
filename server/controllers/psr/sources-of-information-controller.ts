import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export const pageFields: Array<string> = ['sources']

export default class SourcesOfInformationController extends BaseController {
  override templatePath = 'sources-of-information'

  override redirectPath = 'preview-report'

  override formValidation: FormValidation = {
    required: [
      {
        id: 'sources',
        errorMessage: 'You must select all sources used to inform this report',
      },
    ],
  }

  override pageFields = pageFields
}
