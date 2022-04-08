import { Request } from 'express'
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

  override correctFormData = (req: Request): object => {
    const overrides: {
      otherSourceOfInformation?: string
    } = {}
    const sourcesOfInformation: Array<string> = req.body.sourcesOfInformation
      ? [].concat(req.body.sourcesOfInformation)
      : []
    if (!sourcesOfInformation || !sourcesOfInformation.includes('otherInformationSource')) {
      overrides.otherSourceOfInformation = null
    }
    return overrides
  }
}
