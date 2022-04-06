import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Offender assessment')
  }

  completeForm(): void {
    cy.get('.govuk-checkboxes__input').each($el => {
      cy.wrap($el).check()
    })
    cy.get('#issueAccommodationDetails').clear().type('Some accommodation issue')
    cy.get('#issueEmploymentDetails').clear().type('Some employment issue')
    cy.get('#issueFinanceDetails').clear().type('Some finance issue')
    cy.get('#issueRelationshipsDetails').clear().type('Some relationships issue')
    cy.get('#issueSubstanceMisuseDetails').clear().type('Some substance misuse issue')
    cy.get('#issueHealthDetails').clear().type('Some health issue')
    cy.get('#issueBehaviourDetails').clear().type('Some behaviour issue')
    cy.get('#issueOtherDetails').clear().type('Some other issue')
    cy.get('#experienceOfTrauma').click()
    cy.get('#experienceOfTraumaDetails').clear().type('Some experience of trauma')
    cy.get('#caringResponsibilities').click()
    cy.get('#caringResponsibilitiesDetails').clear().type('Some caring responsibilities')
  }

  clearForm(): void {
    cy.get('.govuk-checkboxes__input').each($el => {
      cy.wrap($el).uncheck()
    })
    cy.get('#experienceOfTrauma').invoke('removeAttr', 'checked')
    cy.get('#caringResponsibilities').invoke('removeAttr', 'checked')
  }
}
