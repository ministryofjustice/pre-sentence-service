import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Sources of information')
  }

  completeForm(): void {
    cy.get('.govuk-checkboxes__input').check('interviewInformationSource')
    cy.get('.govuk-checkboxes__input').check('serviceRecordsInformationSource')
    cy.get('.govuk-checkboxes__input').check('cpsSummaryInformationSource')
    cy.get('.govuk-checkboxes__input').check('oasysAssessmentsInformationSource')
    cy.get('.govuk-checkboxes__input').check('previousConvictionsInformationSource')
    cy.get('.govuk-checkboxes__input').check('victimStatementInformationSource')
    cy.get('.govuk-checkboxes__input').check('childrenServicesInformationSource')
    cy.get('.govuk-checkboxes__input').check('policeInformationSource')
    cy.get('.govuk-checkboxes__input').check('sentencingGuidelinesInformationSource')
    cy.get('.govuk-checkboxes__input').check('domesticAbuseInformationSource')
    cy.get('.govuk-checkboxes__input').check('equalityInformationFormInformationSource')
    cy.get('.govuk-checkboxes__input').check('otherInformationSource')
    cy.get('#otherInformationDetails').type('Some other information source')
  }
}
