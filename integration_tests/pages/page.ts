export type PageElement = Cypress.Chainable<JQuery>

export default abstract class Page {
  static verifyOnPage<T>(constructor: new () => T): T {
    return new constructor()
  }

  constructor(readonly title: string) {
    this.checkOnPage()
  }

  checkOnPage(): void {
    cy.get('h1').contains(this.title)
  }

  headingL2 = (): PageElement => cy.get('h2')

  inputText = (): PageElement => cy.get('.govuk-input')

  textArea = (): PageElement => cy.get('.govuk-textarea')

  radioButtons = (): PageElement => cy.get('.govuk-radios')

  checkboxes = (): PageElement => cy.get('.govuk-checkboxes')

  govukBody = (): PageElement => cy.get('.govuk-body')

  govukBulletList = (): PageElement => cy.get('.govuk-list.govuk-list--bullet')

  govukButton = (): PageElement => cy.get('.govuk-button')

  mojSideNavigation = (): PageElement => cy.get('.moj-side-navigation')

  signOut = (): PageElement => cy.get('[data-qa=signOut]')
}
