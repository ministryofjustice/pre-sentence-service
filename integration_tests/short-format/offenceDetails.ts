import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Offence details')
  }

  completeForm(): void {
    cy.get('#mainOffence').type('Some main offence')
    cy.get('#otherOffences').type('Some other offences')
    cy.get('#offenceSummary').type('Some offence summary')
  }
}
