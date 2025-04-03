import BaseController from '../../../server/controllers/record-of-oral/baseController'
import Page from '../../pages/page'
import ReportCompleted from '../../record-of-oral/reportCompleted'

context('Oral - Report completed page', () => {
  const path = `/${new BaseController().path}/0a15ce57-c46e-4b71-84f0-49dbed4bb81e/report-completed`
  let currentPage: ReportCompleted

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.task('stubUserAccess')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(ReportCompleted)
  })

  describe('Authenticated user accesses check your report', () => {
    it('should display the key details', () => {
      cy.get('#qa-key-details').within(() => {
        cy.get('h1').should('contain', 'X320741')
        cy.get('h1').should('contain', 'Lenore Marquez')
      })
    })

    it('should NOT include side navigation', () => {
      currentPage.mojSideNavigation().should('not.exist')
    })
  })
})
