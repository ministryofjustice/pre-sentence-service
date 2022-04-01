import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Offence analysis')
  }

  completeForm(): void {
    cy.get('#offenceAnalysis').type('Some offence analysis')
    cy.get('#patternOfOffendingBehaviour').type('Some patterns of offending behaviour analysis')
  }

  clearForm(): void {
    cy.get('#offenceAnalysis').clear()
    cy.get('#patternOfOffendingBehaviour').clear()
  }
}
