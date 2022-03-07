import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Offender assessment')
  }

  completeForm(): void {
    cy.get('.govuk-checkboxes__input').each($el => {
      cy.wrap($el).check()
    })
    cy.get('#experienceOfTrauma').click()
    cy.get('#caringResponsibilities').click()
    cy.get('#evidenceForAssessment').clear().type('Some evidence')
  }

  clearForm(): void {
    cy.get('.govuk-checkboxes__input').each($el => {
      cy.wrap($el).uncheck()
    })
    cy.get('#evidenceForAssessment').clear()
  }
}
