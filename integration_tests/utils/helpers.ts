function clearRichText(id: string) {
  cy.get(id)
    .parent()
    .within(() => {
      cy.get('.ck-editor__editable_inline').clear()
    })
}

function enterRichText(id: string, text: string) {
  cy.get(id)
    .parent()
    .within(() => {
      cy.get('.ck-editor__editable_inline').clear().type(text)
    })
}

export { clearRichText, enterRichText }
