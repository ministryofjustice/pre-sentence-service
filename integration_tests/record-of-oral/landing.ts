import Page, { PageElement } from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Record of Oral Pre-Sentence Report')
  }

  lastSaved = (): PageElement => cy.get('.qa-last-saved')
}
