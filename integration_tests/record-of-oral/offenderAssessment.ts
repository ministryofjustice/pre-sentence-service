import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Offender assessment')
  }

  completeForm(): void {
    cy.get('.govuk-checkboxes__input').check('issueAccommodation')
    cy.get('.govuk-checkboxes__input').check('issueEmployment')
    cy.get('.govuk-checkboxes__input').check('issueFinance')
    cy.get('.govuk-checkboxes__input').check('issueRelationships')
    cy.get('.govuk-checkboxes__input').check('issueSubstanceMisuse')
    cy.get('.govuk-checkboxes__input').check('issueHealth')
    cy.get('.govuk-checkboxes__input').check('issueBehaviour')
    cy.get('.govuk-checkboxes__input').check('issueMaturity')
    cy.get('.govuk-checkboxes__input').check('issueOther')
    cy.get('#experienceOfTrauma').click()
    cy.get('#caringResponsibilities').click()
    cy.get('#evidenceForAssessment').clear().type('Some evidence')
  }

  clearForm(): void {
    cy.get('.govuk-checkboxes__input').uncheck('issueAccommodation')
    cy.get('.govuk-checkboxes__input').uncheck('issueEmployment')
    cy.get('.govuk-checkboxes__input').uncheck('issueFinance')
    cy.get('.govuk-checkboxes__input').uncheck('issueRelationships')
    cy.get('.govuk-checkboxes__input').uncheck('issueSubstanceMisuse')
    cy.get('.govuk-checkboxes__input').uncheck('issueHealth')
    cy.get('.govuk-checkboxes__input').uncheck('issueBehaviour')
    cy.get('.govuk-checkboxes__input').uncheck('issueMaturity')
    cy.get('.govuk-checkboxes__input').uncheck('issueOther')
    cy.get('#evidenceForAssessment').clear()
  }
}
