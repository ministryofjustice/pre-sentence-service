import BaseController from './baseController'

export const pageFields: Array<string> = ['pnc']

export default class SentencingProposalController extends BaseController {
  override templatePath = 'sentencing-proposal'

  override redirectPath = 'preview-report'

  override pageFields = pageFields
}
