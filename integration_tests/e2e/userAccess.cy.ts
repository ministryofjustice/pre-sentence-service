xcontext('User restriction / exclusion', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
  })

  it('Should display user restriction message', () => {
    cy.task('stubUserAccessRestricted')
    cy.signIn()
    cy.get('h1').contains('User Restricted')
    cy.get('h2').contains('403')
    cy.get('pre').contains('User access to offender record is restricted')
  })

  it('Should display user exclusion message', () => {
    cy.task('stubUserAccessExcluded')
    cy.signIn()
    cy.get('h1').contains('User Excluded')
    cy.get('h2').contains('403')
    cy.get('pre').contains('User is excluded from offender record access')
  })

  it('Should display fatal error message', () => {
    cy.task('stubUserAccessFailed')
    cy.signIn()
    cy.get('h1').contains('Error')
    cy.get('h2').contains('500')
    cy.get('pre').contains('Unable to check restriction / exclusion')
  })
})
