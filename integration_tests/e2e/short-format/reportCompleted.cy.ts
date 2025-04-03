import BaseController from '../../../server/controllers/short-format/baseController'
import Page from '../../pages/page'
import ReportCompleted from '../../short-format/reportCompleted'

context('Short Format - Report completed page', () => {
  const path = `/${new BaseController().path}/0877ed35-e59a-4e94-b2bd-5d2283dd7dd7/report-completed`
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
    it('should NOT include side navigation', () => {
      currentPage.mojSideNavigation().should('not.exist')
    })
  })
})
