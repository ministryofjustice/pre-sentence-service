import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Offender details')
  }

  completeForm(): void {
    cy.get('#address').type('Some address')
    cy.get('#pnc').type('A123467B')
  }
}
