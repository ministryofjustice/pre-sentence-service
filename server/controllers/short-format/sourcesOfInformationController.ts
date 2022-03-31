import BaseController from './baseController'

export const pageFields: Array<string> = ['sourcesOfInformation', 'otherSourceOfInformation']

export default class SourcesOfInformationController extends BaseController {
  override templatePath = 'sources-of-information'

  override redirectPath = 'check-report'

  override pageFields = pageFields
}
