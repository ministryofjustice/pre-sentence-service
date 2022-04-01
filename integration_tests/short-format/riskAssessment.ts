import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Risk assessment')
  }

  completeForm(): void {
    cy.get('#likelihoodOfReOffending').type('Some likelihood of further offending')
    cy.get('#riskOfSeriousHarm').type('Some RoSH evidence')
    cy.get('#responseToPreviousSupervision').click()
  }

  clearForm(): void {
    cy.get('#likelihoodOfReOffending').clear()
    cy.get('#riskOfSeriousHarm').clear()
    cy.get('#responseToPreviousSupervision').invoke('removeAttr', 'checked')
  }
}
