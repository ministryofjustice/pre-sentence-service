context('Pre-sentence to Delius API', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()
  })

  describe('Defendant Details Endpoint', () => {
    const psrUuid = 'b7b8b7b8-b7b8-b7b8-b7b8-b7b8b7b8b7b8'

    it('should successfully fetch defendant details', () => {
      cy.task('stubDefendantDetails', psrUuid)
    })

    it('should handle defendant details not found', () => {
      cy.task('stubDefendantDetailsNotFound', psrUuid)

      // Test application behavior when defendant details are not found
    })

    it('should handle defendant with no fixed abode', () => {
      cy.task('stubDefendantDetailsNoFixedAbode', psrUuid)

      // Test application behavior when defendant has no fixed abode
    })

    it('should handle server errors gracefully', () => {
      cy.task('stubDefendantDetailsServerError', psrUuid)

      // Test application error handling
    })
  })

  describe('Offences Endpoint', () => {
    const crn = 'X320741'

    it('should successfully fetch offences', () => {
      cy.task('stubOffences', crn)
    })

    it('should handle offences not found', () => {
      cy.task('stubOffencesNotFound', crn)

      // Test application behavior when offences are not found
    })

    it('should handle multiple additional offences', () => {
      cy.task('stubOffencesWithMultipleAdditional', crn)

      // Test application behavior with multiple additional offences
    })

    it('should handle server errors gracefully', () => {
      cy.task('stubOffencesServerError', crn)

      // Test application error handling
    })
  })
})
