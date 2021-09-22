import LandingPage from '../../short-format/landing'
import Page from '../../pages/page'

context('SignIn', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()
  })

  it('Authenticated user accesses Short Format Pre-Sentence Report', () => {
    cy.visit('/short-format')
    Page.verifyOnPage(LandingPage)
  })
})
