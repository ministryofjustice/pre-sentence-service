import Page from '../pages/page'
import { clearRichText, enterRichText } from '../utils/helpers'

export default class IndexPage extends Page {
  constructor() {
    super('Offence details')
  }

  completeForm(): void {
    enterRichText('#mainOffence', 'Some main offence')
    enterRichText('#otherOffences', 'Some other offences')
  }

  clearForm(): void {
    clearRichText('#mainOffence')
    clearRichText('#otherOffences')
  }
}
