import BaseController from './baseController'
import { Request } from 'express'
import { sourcesOfInformationModel } from '../../schemas/sources-of-information'

export const pageFields: Array<string> = ['sourcesOfInformation']

export default class SourcesOfInformationController extends BaseController {
  override templatePath = 'sources-of-information'

  override redirectPath = 'preview-report'

  override model = sourcesOfInformationModel

  override pageFields = pageFields

  override correctFormData = (req: Request) => {
    if (!req.body.sourcesOfInformation) {
      return { sourcesOfInformation: [] }
    }
    return {}
  }
}
