context('Preview report', () => {
  const path = `/0a15ce57-c46e-4b71-84f0-49dbed4bb81e/preview`

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()

    cy.visit(path)
    cy.get('h1').contains('Record of Oral Pre-Sentence Report').should('exist')
  })

  describe('Authenticated user accesses report preview', () => {
    it('should NOT include official wording', () => {
      cy.get('#qa-official').should('not.exist')
    })

    it('should include the correct sub heading', () => {
      cy.get('#qa-sub-heading')
        .contains(
          'This is a record of the oral presentation of a Pre-Sentence Report as defined in Section 158 of the Criminal Justice Act 2003.'
        )
        .should('exist')
    })

    it('should include the preview watermark', () => {
      cy.get('.watermark').contains('PREVIEW').should('exist')
    })

    it('should correctly display user inputted data', () => {
      cy.visit('/record-of-oral/0a15ce57-c46e-4b71-84f0-49dbed4bb81e/court-details')
      cy.get('#dateOfHearing-day').clear().type('1')
      cy.get('#dateOfHearing-month').clear().type('3')
      cy.get('#dateOfHearing-year').clear().type('2022')
      cy.get('.govuk-button').contains('Continue').click()

      cy.visit(path)

      cy.get('#qa-dateOfHearing').contains('01/03/2022').should('exist')
    })

    it('should include the defendant name', () => {
      cy.get('#qa-name').contains('Lenore Marquez').should('exist')
    })
  })
})
