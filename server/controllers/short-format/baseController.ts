import SharedController, { TemplateValues } from '../shared/sharedController'

export default class BaseController extends SharedController {
  override path = 'short-format'

  override templateValues: TemplateValues = {
    preSentenceType: 'Short Format Pre-Sentence Report',
  }
}
