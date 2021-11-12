import SharedController, { TemplateValues } from '../shared/sharedController'

export default class BaseController extends SharedController {
  override path = 'short-format'

  override templateValues: TemplateValues = {
    reportPath: this.path,
    preSentenceType: 'Short Format Pre-Sentence Report',
  }
}
