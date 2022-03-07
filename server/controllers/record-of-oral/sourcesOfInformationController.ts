import BaseController from './baseController'

export default class SourcesOfInformationController extends BaseController {
  override templatePath = 'sources-of-information'

  override redirectPath = 'check-report'

  override pageFields = ['sourcesOfInformation', 'otherSourceOfInformation']
}
