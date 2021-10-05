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
    cy.get('#experienceTrauma').click()
    cy.get('#caringResponsibilities').click()
    cy.get('#offenderAssessmentEvidence').type('Some evidence')
  }
}
