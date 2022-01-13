import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Offender details')
  }

  completeForm(): void {
    cy.get('#address').clear().type('Some address')
    cy.get('#pnc').clear().type('A123467B')
  }
}
