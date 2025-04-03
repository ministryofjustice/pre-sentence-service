import BaseController from './baseController'

export const pageFields: Array<string> = ['pnc']

export default class OffenceAnalysisController extends BaseController {
  override templatePath = 'offence-analysis'

  override pageFields = pageFields

  override redirectPath = 'behavioural-factors-and-lifestyle-considerations'
}
