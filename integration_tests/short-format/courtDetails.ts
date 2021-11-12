import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Sentencing court details')
  }

  clearForm(): void {
    cy.get('#dateOfHearing-day').clear()
    cy.get('#dateOfHearing-month').clear()
    cy.get('#dateOfHearing-year').clear()
  }

  completeForm(): void {
    cy.get('#dateOfHearing-day').type('27')
    cy.get('#dateOfHearing-month').type('10')
    cy.get('#dateOfHearing-year').type('2021')
  }
}
