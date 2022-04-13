import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Offence analysis')
  }

  completeForm(): void {
    cy.get('#offenceAnalysis')
      .parent()
      .within(() => {
        cy.get('.ck-editor__editable_inline').clear().type('Some offence analysis')
      })
    cy.get('#patternOfOffendingBehaviour').click()
    cy.get('#escalationInSeriousness').click()
  }

  clearForm(): void {
    cy.get('#offenceAnalysis')
      .parent()
      .within(() => {
        cy.get('.ck-editor__editable_inline').clear()
      })
    cy.get('#patternOfOffendingBehaviour').invoke('removeAttr', 'checked')
    cy.get('#escalationInSeriousness').invoke('removeAttr', 'checked')
  }
}
