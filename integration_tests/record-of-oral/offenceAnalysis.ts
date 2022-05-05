import Page from '../pages/page'
import { clearRichText, enterRichText } from '../utils/helpers'

export default class IndexPage extends Page {
  constructor() {
    super('Offence analysis')
  }

  completeForm(): void {
    enterRichText('#offenceAnalysis', 'Some offence analysis')
    cy.get('#patternOfOffendingBehaviour').click()
    cy.get('#escalationInSeriousness').click()
  }

  clearForm(): void {
    clearRichText('#offenceAnalysis')
    cy.get('#patternOfOffendingBehaviour').invoke('removeAttr', 'checked')
    cy.get('#escalationInSeriousness').invoke('removeAttr', 'checked')
  }
}
