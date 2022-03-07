import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Sources of information')
  }

  completeForm(): void {
    cy.get('.govuk-checkboxes__input').each($el => {
      cy.wrap($el).check()
    })
    cy.get('#otherInformationDetails').type('Some other information source')
  }
}
