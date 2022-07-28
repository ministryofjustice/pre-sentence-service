import BaseController from '../../../server/controllers/short-format/baseController'
import Page from '../../pages/page'
import CheckReport from '../../short-format/checkReport'

context('Short Format - Check report page', () => {
  const path = `/${new BaseController().path}/0877ed35-e59a-4e94-b2bd-5d2283dd7dd7/check-report`
  let currentPage: CheckReport

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.task('stubUserAccess')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(CheckReport)
  })

  describe('Authenticated user accesses check your report', () => {
    it('should display the key details', () => {
      cy.get('#qa-key-details').within(() => {
        cy.get('h2').should('contain', 'CRN: X320741')
        cy.get('h1').should('contain', 'Lenore Marquez')
      })
    })

    it('should NOT include side navigation', () => {
      currentPage.mojSideNavigation().should('not.exist')
    })

    it('should include the task list', () => {
      cy.get('.moj-task-list').should('exist')
    })
  })
})
