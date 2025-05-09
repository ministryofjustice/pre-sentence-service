import BaseController from '../../../server/controllers/record-of-oral/baseController'
import Page from '../../pages/page'
import CheckReport from '../../record-of-oral/checkReport'

context('Oral - Check report page', () => {
  const path = `/${new BaseController().path}/0a15ce57-c46e-4b71-84f0-49dbed4bb81e/check-report`
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
    it('should NOT include side navigation', () => {
      currentPage.mojSideNavigation().should('not.exist')
    })

    it('should include the task list', () => {
      cy.get('.moj-task-list').should('exist')
    })
  })
})
