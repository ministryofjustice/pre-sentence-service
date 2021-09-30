import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Proposal')
  }

  completeForm(): void {
    cy.get('#confirmEIF').click()
    cy.get('#proposal').type('Some proposal text')
  }
}
