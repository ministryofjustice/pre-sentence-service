import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Offence analysis')
  }

  completeForm(): void {
    cy.get('#offenceAnalysis').type('Some offence analysis')
    cy.get('#patternOfOffending').click()
    cy.get('#escalationInSeriousness').click()
  }
}
