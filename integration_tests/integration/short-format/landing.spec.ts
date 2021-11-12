import BaseController from '../../../server/controllers/short-format/baseController'
import LandingPage from '../../short-format/landing'
import Page from '../../pages/page'
import OffenderDetails from '../../short-format/offenderDetails'

context('Record of Oral Pre-Sentence Report landing page', () => {
  const path = `/${new BaseController().path}`
  let currentPage: LandingPage

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(LandingPage)
  })

  describe('Authenticated user accesses Record of Oral Pre-Sentence Report', () => {
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
})
