import BaseController from './baseController'

export const pageFields: Array<string> = ['pnc', 'offencesUnderConsideration', 'offencesPattern', 'noPreviousOffences']

export default class OffenceAnalysisController extends BaseController {
  override templatePath = 'offence-analysis'

  override redirectPath = 'defendant-behaviour'

  override pageFields = pageFields
}
