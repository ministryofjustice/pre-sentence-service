import BaseController from '../../../server/controllers/record-of-oral/baseController'
import LandingPage from '../../record-of-oral/landing'
import Page from '../../pages/page'
import OffenderDetails from '../../record-of-oral/offenderDetails'

context('Record of Oral Pre-Sentence Report landing page', () => {
  const path = `/${new BaseController().path}/0a15ce57-c46e-4b71-84f0-49dbed4bb81e`
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
    it('should display the key details', () => {
      cy.get('#qa-key-details').within(() => {
        cy.get('h2').should('contain', 'CRN: DX12340A')
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
})
