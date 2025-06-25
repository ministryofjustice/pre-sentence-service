import BaseController from './baseController'

export const pageFields: Array<string> = [
  'name',
  'dateOfBirth',
  'age',
  'crn',
  'pnc',
  'address-buildingName',
  'address-number',
  'address-streetName',
  'address-town',
  'address-district',
  'address-county',
  'address-postcode',
]

export default class DefendantDetails extends BaseController {
  override templatePath = 'psr-defendant-details'

  override redirectPath = 'offence-analysis'

  override pageFields = pageFields
}
