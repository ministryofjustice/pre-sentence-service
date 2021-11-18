import BaseController from '../../../server/controllers/record-of-oral/baseController'
import LandingPage from '../../record-of-oral/landing'
import Page from '../../pages/page'
import OffenderDetails from '../../record-of-oral/offenderDetails'

context('Record of Oral Pre-Sentence Report landing page', () => {
  const path = `/${new BaseController().path}/123456789`
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
