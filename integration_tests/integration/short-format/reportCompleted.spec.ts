import BaseController from '../../../server/controllers/short-format/baseController'
import Page from '../../pages/page'
import SignReport from '../../short-format/signReport'
import ReportCompleted from '../../short-format/reportCompleted'

context('Report completed page', () => {
  const path = `/${new BaseController().path}/0877ed35-e59a-4e94-b2bd-5d2283dd7dd7/sign-report`
  let currentPage: SignReport | ReportCompleted

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(SignReport)
    currentPage.govukButton().contains('Submit and view your report').click()
    currentPage = Page.verifyOnPage(ReportCompleted)
  })

  describe('Authenticated user accesses check your report', () => {
    it('should NOT include side navigation', () => {
      currentPage.mojSideNavigation().should('not.exist')
    })
  })
})
