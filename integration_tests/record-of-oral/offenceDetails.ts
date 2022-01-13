import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Offence details')
  }

  completeForm(): void {
    cy.get('#mainOffence').clear().type('Some main offence')
    cy.get('#otherOffences').clear().type('Some other offences')
  }

  clearForm(): void {
    cy.get('#mainOffence').clear()
    cy.get('#otherOffences').clear()
  }
}
