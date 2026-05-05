import BaseController from './baseController'
import { defendantBehaviourModel } from '../../schemas/defendant-behaviour'

export const pageFields: Array<string> = ['defendantBehaviour']

export default class DefendantBehaviourController extends BaseController {
  override templatePath = 'psr-defendant-behaviour'

  override redirectPath = 'risk-analysis'

  override model = defendantBehaviourModel

  override pageFields = pageFields
}
