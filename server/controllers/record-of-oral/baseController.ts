import SharedController, { TemplateValues } from '../shared/sharedController'

export default class BaseController extends SharedController {
  override path = 'record-of-oral'

  override templateValues: TemplateValues = {
    reportPath: this.path,
    preSentenceType: 'Record of Oral Pre-Sentence Report',
  }
}
