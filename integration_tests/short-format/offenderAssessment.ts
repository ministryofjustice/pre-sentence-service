import Page from '../pages/page'
import { enterRichText } from '../utils/helpers'

export default class IndexPage extends Page {
  constructor() {
    super('Offender assessment')
  }

  completeForm(): void {
    cy.get('.govuk-checkboxes__input').each($el => {
      cy.wrap($el).check()
    })
    enterRichText('#issueAccommodationDetails', 'Some accommodation issue')
    enterRichText('#issueEmploymentDetails', 'Some employment issue')
    enterRichText('#issueFinanceDetails', 'Some finance issue')
    enterRichText('#issueRelationshipsDetails', 'Some relationships issue')
    enterRichText('#issueSubstanceMisuseDetails', 'Some substance misuse issue')
    enterRichText('#issueHealthDetails', 'Some health issue')
    enterRichText('#issueBehaviourDetails', 'Some behaviour issue')
    enterRichText('#issueOtherDetails', 'Some other issue')
    cy.get('#experienceOfTrauma').click()
    enterRichText('#experienceOfTraumaDetails', 'Some experience of trauma')
    cy.get('#caringResponsibilities').click()
    enterRichText('#caringResponsibilitiesDetails', 'Some caring responsibilities')
  }

  clearForm(): void {
    cy.get('.govuk-checkboxes__input').each($el => {
      cy.wrap($el).uncheck()
    })
    cy.get('#experienceOfTrauma').invoke('removeAttr', 'checked')
    cy.get('#caringResponsibilities').invoke('removeAttr', 'checked')
  }
}
