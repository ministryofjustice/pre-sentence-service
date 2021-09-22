export type PageElement = Cypress.Chainable<JQuery>

export default abstract class Page {
  static verifyOnPage<T>(constructor: new () => T): T {
    return new constructor()
  }

  constructor(private readonly title: string) {
    this.checkOnPage()
  }

  checkOnPage(): void {
    cy.get('h1').contains(this.title)
  }

  govukBulletList = (): PageElement => cy.get('.govuk-list.govuk-list--bullet')

  govukButton = (): PageElement => cy.get('.govuk-button')

  signOut = (): PageElement => cy.get('[data-qa=signOut]')
}
