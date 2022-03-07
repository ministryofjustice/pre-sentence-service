import BaseController from './baseController'

export default class OffenderDetailsController extends BaseController {
  override templatePath = 'offender-details'

  override redirectPath = 'court-details'

  override defaultTemplateData = {
    name: 'Lenore Marquez',
    dateOfBirth: '18/08/1979',
    crn: 'DX12340A',
    address: '',
    pnc: '',
  }
}
