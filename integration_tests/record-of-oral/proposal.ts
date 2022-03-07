import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Proposal')
  }

  completeForm(): void {
    cy.get('#equalityAndDiversity').click()
    cy.get('#proposal').clear().type('Some proposal text')
  }

  clearForm(): void {
    cy.get('#proposal').clear()
  }
}
