import BaseController from '../../../server/controllers/short-format/baseController'
import LandingPage from '../../short-format/landing'
import Page from '../../pages/page'
import OffenderDetails from '../../short-format/offenderDetails'

context('Short Format Pre-Sentence Report landing page', () => {
  const reportId = '0877ed35-e59a-4e94-b2bd-5d2283dd7dd7'
  const path = `/${new BaseController().path}/${reportId}`
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
        cy.get('h1').should('contain', 'X320741')
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
      cy.visit(`/shortFormatPreSentenceReport/${reportId}`)
      currentPage = Page.verifyOnPage(LandingPage)
    })
  })

  describe('Authenticated user accesses Record of Oral Pre-Sentence Report to complete a previously started report', () => {
    it('should display a continue button', () => {
      cy.visit(`/${path}/offender-details`)
      currentPage.govukButton().contains('Save and continue').click()
      cy.visit(path)
      currentPage.govukButton().should('contain.text', 'Continue now')
    })

    it('should display the last saved timestamp', () => {
      currentPage.lastSaved().should('exist')
    })
  })
})

context('Short Format Pre-Sentence Report landing page error statuses', () => {
  const notFoundReportId = '0877ed35-e59a-4e94-b2bd-11111111111111'
  const inlaidReportId = '0877ed35-'
  const path = `/${new BaseController().path}`

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.task('stubUserAccess')
    cy.signIn()
  })

  describe('The Page should return a 404 for a missing report', () => {
    it('return a 404', () => {
      cy.request({ url: `${path}/${notFoundReportId}`, failOnStatusCode: false })
        .its('status')
        .should('equal', 404)
      cy.visit(`${path}/${notFoundReportId}`, { failOnStatusCode: false })
    })
  })

  describe('The Page should return a 404 for an invalid report id', () => {
    it('return a 404', () => {
      cy.request({ url: `${path}/${inlaidReportId}`, failOnStatusCode: false })
        .its('status')
        .should('equal', 404)
      cy.visit(`${path}/${inlaidReportId}`, { failOnStatusCode: false })
    })
  })
})
