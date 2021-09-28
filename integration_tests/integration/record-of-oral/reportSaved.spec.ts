import BaseController from '../../../server/controllers/record-of-oral/baseController'
import Page from '../../pages/page'
import ReportSaved from '../../record-of-oral/reportSaved'

context('Draft report saved page', () => {
  const path = `/${new BaseController().path}/report-saved`
  let currentPage

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(ReportSaved)
  })

  describe('Authenticated user accesses check your report', () => {
    it('should NOT include side navigation', () => {
      currentPage.mojSideNavigation().should('not.exist')
    })
  })
})