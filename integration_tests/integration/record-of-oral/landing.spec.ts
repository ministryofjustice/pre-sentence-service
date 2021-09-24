import BaseController from '../../../server/controllers/record-of-oral/baseController'
import LandingPage from '../../record-of-oral/landing'
import Page from '../../pages/page'

context('Report landing page', () => {
  const path = `/${new BaseController().path}`

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()
  })

  describe('Authenticated user accesses Record of Oral Pre-Sentence Report', () => {
    it('should display the landing page', () => {
      cy.visit(path)
      Page.verifyOnPage(LandingPage)
    })

    it('should include a list of features', () => {
      cy.visit(path)
      const currentPage = Page.verifyOnPage(LandingPage)
      currentPage.govukBulletList().should('exist')
    })

    it('should NOT display the last saved timestamp', () => {
      cy.visit(path)
      const currentPage = Page.verifyOnPage(LandingPage)
      currentPage.lastSaved().should('not.exist')
    })

    it('should include the primary call to action button', () => {
      cy.visit(path)
      const currentPage = Page.verifyOnPage(LandingPage)
      currentPage.govukButton().should('contain.text', 'Start now')
    })
  })
})
