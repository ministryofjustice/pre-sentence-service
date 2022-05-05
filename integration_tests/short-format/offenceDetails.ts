import Page from '../pages/page'
import { clearRichText, enterRichText } from '../utils/helpers'

export default class IndexPage extends Page {
  constructor() {
    super('Offence details')
  }

  completeForm(): void {
    enterRichText('#mainOffence', 'Some main offence')
    enterRichText('#otherOffences', 'Some other offences')
    enterRichText('#offenceSummary', 'Some offence summary')
  }

  clearForm(): void {
    clearRichText('#mainOffence')
    clearRichText('#otherOffences')
    clearRichText('#offenceSummary')
  }
}
