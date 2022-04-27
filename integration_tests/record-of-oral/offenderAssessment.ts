import Page from '../pages/page'
import { clearRichText, enterRichText } from '../utils/helpers'

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
    enterRichText('#evidenceForAssessment', 'Some evidence')
  }

  clearForm(): void {
    cy.get('.govuk-checkboxes__input').each($el => {
      cy.wrap($el).uncheck()
    })
    cy.get('#experienceOfTrauma').invoke('removeAttr', 'checked')
    cy.get('#caringResponsibilities').invoke('removeAttr', 'checked')
    clearRichText('#evidenceForAssessment')
  }
}
