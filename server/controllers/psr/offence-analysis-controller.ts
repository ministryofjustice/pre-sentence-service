import BaseController from './baseController'
import * as z from 'zod'

const offenceAnalysisModel = z.object({
  pnc: z.string(),
  offencesUnderConsideration: z.string(),
  offencesPattern: z.string(),
  noPreviousOffences: z.string(),
})

export const pageFields: Array<string> = ['pnc', 'offencesUnderConsideration', 'offencesPattern', 'noPreviousOffences']

export default class OffenceAnalysisController extends BaseController {
  override templatePath = 'offence-analysis'

  override redirectPath = 'defendant-behaviour'

  override pageFields = pageFields

  override model = offenceAnalysisModel
}
