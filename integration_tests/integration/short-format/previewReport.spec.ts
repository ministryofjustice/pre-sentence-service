context('Short-format - Preview report', () => {
  const path = '/0877ed35-e59a-4e94-b2bd-5d2283dd7dd7/preview'

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()

    cy.visit(path)
  })

  describe('Authenticated user accesses report preview', () => {
    it('should NOT include official wording', () => {
      cy.get('#qa-official').should('not.exist')
    })

    it('should include the correct heading', () => {
      cy.get('h1').contains('Short Format Pre-Sentence Report').should('exist')
    })

    it('should include the correct sub heading', () => {
      cy.get('#qa-sub-heading')
        .contains('This is a Pre-Sentence Report as defined in Section 158 of the Criminal Justice Act 2003.')
        .should('exist')
    })

    it('should include the preview watermark', () => {
      cy.get('.watermark').contains('PREVIEW').should('exist')
    })

    it('should correctly display user inputted data', () => {
      cy.visit('/short-format/0877ed35-e59a-4e94-b2bd-5d2283dd7dd7/court-details')
      cy.get('#dateOfHearing-day').clear().type('1')
      cy.get('#dateOfHearing-month').clear().type('3')
      cy.get('#dateOfHearing-year').clear().type('2022')
      cy.get('.govuk-button').contains('Save and continue').click()

      cy.visit(path)

      cy.get('#qa-dateOfHearing').contains('01/03/2022').should('exist')
    })

    it('should include the defendant name', () => {
      cy.get('#qa-name').contains('Lenore Marquez').should('exist')
    })
  })
})
