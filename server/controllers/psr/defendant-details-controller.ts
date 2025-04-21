import BaseController from './baseController'

export const pageFields: Array<string> = ['name', 'dateOfBirth', 'age', 'crn', 'address', 'pnc']

export default class DefendantDetails extends BaseController {
  override templatePath = 'psr-defendant-details'

  override redirectPath = 'offence-analysis'

  override pageFields = pageFields
}
