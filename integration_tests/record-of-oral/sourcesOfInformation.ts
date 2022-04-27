import Page from '../pages/page'
import { enterRichText } from '../utils/helpers'

export default class IndexPage extends Page {
  constructor() {
    super('Sources of information')
  }

  completeForm(): void {
    cy.get('.govuk-checkboxes__input').each($el => {
      cy.wrap($el).check()
    })
    enterRichText('#otherSourceOfInformation', 'Some other information source')
  }

  clearForm(): void {
    cy.get('.govuk-checkboxes__input').each($el => {
      cy.wrap($el).uncheck()
    })
  }
}
