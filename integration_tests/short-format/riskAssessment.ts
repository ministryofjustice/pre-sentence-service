import Page from '../pages/page'
import { clearRichText, enterRichText } from '../utils/helpers'

export default class IndexPage extends Page {
  constructor() {
    super('Risk assessment')
  }

  completeForm(): void {
    enterRichText('#likelihoodOfReOffending', 'Some likelihood of further offending')
    enterRichText('#riskOfSeriousHarm', 'Some RoSH evidence')
    cy.get('#responseToPreviousSupervision').click()
    enterRichText('#responseToPreviousSupervisionDetails', 'Some previous supervision information')
  }

  clearForm(): void {
    clearRichText('#likelihoodOfReOffending')
    clearRichText('#riskOfSeriousHarm')
    cy.get('#responseToPreviousSupervision').invoke('removeAttr', 'checked')
    clearRichText('#responseToPreviousSupervisionDetails')
  }
}
