import Page from '../pages/page'
import { clearRichText, enterRichText } from '../utils/helpers'

export default class IndexPage extends Page {
  constructor() {
    super('Proposal')
  }

  completeForm(): void {
    cy.get('#equalityAndDiversity').click()
    enterRichText('#proposal', 'Some proposal text')
  }

  clearForm(): void {
    cy.get('#equalityAndDiversity').invoke('removeAttr', 'checked')
    clearRichText('#proposal')
  }
}
