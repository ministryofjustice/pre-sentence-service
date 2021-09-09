import LandingPage from '../../short-format/landing'
import Page from '../../pages/page'

context('SignIn', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()
  })

  it('Unauthenticated user directed to auth', () => {
    cy.visit('/short-format')
    Page.verifyOnPage(LandingPage)
  })
})
