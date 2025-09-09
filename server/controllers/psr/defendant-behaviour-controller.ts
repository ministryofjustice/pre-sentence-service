import BaseController from './baseController'
import * as z from 'zod'

export const pageFields: Array<string> = ['name', 'dateOfBirth', 'age', 'crn', 'address', 'pnc', 'defendantBehaviour']

const defendantBehaviourModel = z.object({
  defendantBehaviour: z.string().min(1, "Assess the defendant's behaviour and lifestyle"),
})

export default class DefendantBehaviourController extends BaseController {
  override templatePath = 'psr-defendant-behaviour'

  override redirectPath = 'risk-analysis'

  override model = defendantBehaviourModel

  override pageFields = pageFields
}
