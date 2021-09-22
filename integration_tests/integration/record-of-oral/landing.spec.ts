import LandingPage from '../../record-of-oral/landing'
import Page from '../../pages/page'

context('SignIn', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()
  })

  describe('Authenticated user accesses Record of Oral Pre-Sentence Report', () => {
    it('should display the landing page', () => {
      cy.visit('/record-of-oral')
      Page.verifyOnPage(LandingPage)
    })

    it('should include a list of features', () => {
      cy.visit('/record-of-oral')
      const landingPage = Page.verifyOnPage(LandingPage)
      landingPage.govukBulletList().should('exist')
    })

    it('should NOT display the last saved timestamp', () => {
      cy.visit('/record-of-oral')
      const landingPage = Page.verifyOnPage(LandingPage)
      landingPage.lastSaved().should('not.exist')
    })

    it('should include the primary call to action button', () => {
      cy.visit('/record-of-oral')
      const landingPage = Page.verifyOnPage(LandingPage)
      landingPage.govukButton().should('contain.text', 'Start now')
    })
  })
})
