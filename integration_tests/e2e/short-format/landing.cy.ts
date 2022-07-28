import BaseController from '../../../server/controllers/short-format/baseController'
import LandingPage from '../../short-format/landing'
import Page from '../../pages/page'
import OffenderDetails from '../../short-format/offenderDetails'

context('Short Format Pre-Sentence Report landing page', () => {
  const path = `/${new BaseController().path}/0877ed35-e59a-4e94-b2bd-5d2283dd7dd7`
  let currentPage: LandingPage

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.task('stubUserAccess')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(LandingPage)
  })

  describe('Authenticated user accesses Short Format Pre-Sentence Report', () => {
    it('should display the key details', () => {
      cy.get('#qa-key-details').within(() => {
        cy.get('h2').should('contain', 'CRN: X320741')
        cy.get('h1').should('contain', 'Lenore Marquez')
      })
    })

    it('should include a list of features', () => {
      currentPage.govukBulletList().should('exist')
    })

    it('should NOT display the last saved timestamp', () => {
      currentPage.lastSaved().should('not.exist')
    })

    it('should include the primary call to action button', () => {
      currentPage.govukButton().should('contain.text', 'Start now')
    })

    it('should move to the first page of the report', () => {
      currentPage.govukButton().should('contain.text', 'Start now').click()
      Page.verifyOnPage(OffenderDetails)
    })
  })

  describe('Authenticated user accesses Short Format Pre-Sentence Report from nDelius', () => {
    it('should redirect to the correct URL', () => {
      cy.visit('/shortFormatPreSentenceReport/0877ed35-e59a-4e94-b2bd-5d2283dd7dd7')
      currentPage = Page.verifyOnPage(LandingPage)
    })
  })
})
