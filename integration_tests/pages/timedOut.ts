import Page, { PageElement } from './page'

export default class TimedOutPage extends Page {
  constructor() {
    super('You have been signed out')
  }

  signIn = (): PageElement => cy.get('[data-qa=sign-in]')
}
