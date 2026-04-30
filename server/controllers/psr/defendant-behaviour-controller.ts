import BaseController from './baseController'
import * as z from 'zod'
import { longText } from '../../utils/validation'

export const pageFields: Array<string> = ['defendantBehaviour']

const defendantBehaviourModel = z.object({
  defendantBehaviour: longText({
    label: "Assessment of defendant's behaviour and lifestyle",
    requiredMessage: "Assess the defendant's behaviour and lifestyle",
  }),
})

export default class DefendantBehaviourController extends BaseController {
  override templatePath = 'psr-defendant-behaviour'

  override redirectPath = 'risk-analysis'

  override model = defendantBehaviourModel

  override pageFields = pageFields
}
