import BaseController from './baseController'
import * as z from 'zod'

export const pageFields: Array<string> = ['sourcesOfInformation']

const sourcesOfInformationModel = z.object({
  sourcesOfInformation: z.string().min(1, 'You must select all sources used to inform this report'),
})

export default class SourcesOfInformationController extends BaseController {
  override templatePath = 'sources-of-information'

  override redirectPath = 'preview-report'

  override model = sourcesOfInformationModel

  override pageFields = pageFields
}
