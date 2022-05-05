import Page from '../pages/page'
import { clearRichText, enterRichText } from '../utils/helpers'

export default class IndexPage extends Page {
  constructor() {
    super('Offence analysis')
  }

  completeForm(): void {
    enterRichText('#offenceAnalysis', 'Some offence analysis')
    enterRichText('#patternOfOffendingBehaviour', 'Some patterns of offending behaviour analysis')
  }

  clearForm(): void {
    clearRichText('#offenceAnalysis')
    clearRichText('#patternOfOffendingBehaviour')
  }
}
