import SharedController, { TemplateValues } from '../shared/sharedController'

export default class BaseController extends SharedController {
  override path = 'psr'

  override templateValues: TemplateValues = {
    reportPath: this.path,
    preSentenceType: 'Pre-Sentence Report',
  }
}
