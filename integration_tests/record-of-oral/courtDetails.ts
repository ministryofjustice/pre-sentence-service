import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Sentencing court details')
  }

  completeForm(): void {
    cy.get('#localJusticeArea').clear().type('Some local justice area')
    cy.get('#dateOfHearing-day').clear().type('27')
    cy.get('#dateOfHearing-month').clear().type('10')
    cy.get('#dateOfHearing-year').clear().type('2021')
  }

  clearForm(): void {
    cy.get('#localJusticeArea').clear()
    cy.get('#dateOfHearing-day').clear()
    cy.get('#dateOfHearing-month').clear()
    cy.get('#dateOfHearing-year').clear()
  }
}
