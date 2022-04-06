import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Sign your report')
  }

  completeForm(): void {
    cy.get('#reportAuthor').clear().type('Arthur Author')
    cy.get('#office').clear().type('Sheffield Probation Office')
    cy.get('#officePhoneNumber').clear().type('0114 276 0760')
    cy.get('#counterSignature').clear().type('John Johnson')
    cy.get('#completionDate-day').clear().type('27')
    cy.get('#completionDate-month').clear().type('10')
    cy.get('#completionDate-year').clear().type('2021')
  }

  clearForm(): void {
    cy.get('#reportAuthor').clear()
    cy.get('#office').clear()
    cy.get('#officePhoneNumber').clear()
    cy.get('#counterSignature').clear()
    cy.get('#completionDate-day').clear()
    cy.get('#completionDate-month').clear()
    cy.get('#completionDate-year').clear()
  }
}
