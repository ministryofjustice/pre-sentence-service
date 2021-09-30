import BaseController from '../../../server/controllers/record-of-oral/baseController'
import Page from '../../pages/page'
import CheckReport from '../../record-of-oral/checkReport'
import SignReport from '../../record-of-oral/signReport'

context('Check report page', () => {
  const path = `/${new BaseController().path}/check-report`
  let currentPage: CheckReport

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(CheckReport)
  })

  describe('Authenticated user accesses check your report', () => {
    it('should NOT include side navigation', () => {
      currentPage.mojSideNavigation().should('not.exist')
    })

    it('should include the task list', () => {
      cy.get('.moj-task-list').should('exist')
    })

    it('should include the primary call to action button', () => {
      currentPage.govukButton().contains('Sign your report').should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.govukButton().contains('Sign your report').click()
      Page.verifyOnPage(SignReport)
    })
  })
})
