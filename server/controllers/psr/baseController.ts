import SharedController, { TemplateValues } from '../shared/sharedController'
import * as z from 'zod'

export default class BaseController extends SharedController {
  override path = 'psr'

  override templateValues: TemplateValues<z.infer<typeof this.model>> = {
    reportPath: this.path,
    preSentenceType: 'Pre-Sentence Report',
  }
}
