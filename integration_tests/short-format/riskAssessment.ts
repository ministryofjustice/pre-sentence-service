import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Risk assessment')
  }

  completeForm(): void {
    cy.get('#likelihoodOfReOffending').clear().type('Some likelihood of further offending')
    cy.get('#riskOfSeriousHarm').clear().type('Some RoSH evidence')
    cy.get('#responseToPreviousSupervision').click()
    cy.get('#responseToPreviousSupervisionDetails').clear().type('Some previous supervision information')
  }

  clearForm(): void {
    cy.get('#likelihoodOfReOffending').clear()
    cy.get('#riskOfSeriousHarm').clear()
    cy.get('#responseToPreviousSupervision').invoke('removeAttr', 'checked')
    cy.get('#responseToPreviousSupervisionDetails').clear()
  }
}
