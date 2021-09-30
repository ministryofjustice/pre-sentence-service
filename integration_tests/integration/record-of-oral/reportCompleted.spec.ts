import BaseController from '../../../server/controllers/record-of-oral/baseController'
import Page from '../../pages/page'
import SignReport from '../../record-of-oral/signReport'
import ReportCompleted from '../../record-of-oral/reportCompleted'

context('Report completed page', () => {
  const path = `/${new BaseController().path}/sign-report`
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
