import BaseController from '../../../server/controllers/short-format/baseController'
import Page from '../../pages/page'
import SignReport from '../../short-format/signReport'
import ReportCompleted from '../../short-format/reportCompleted'

context('Short Format - Sign report page', () => {
  const path = `/${new BaseController().path}/0877ed35-e59a-4e94-b2bd-5d2283dd7dd7/sign-report`
  let currentPage: SignReport

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(SignReport)
  })

  describe('Authenticated user accesses check your report', () => {
    it('should include the required form elements', () => {
      currentPage
        .inputText()
        .parent()
        .within(() => {
          cy.get('label').contains('Report author').should('exist')
        })

      currentPage
        .inputText()
        .parent()
        .within(() => {
          cy.get('label').contains('Office').should('exist')
        })

      currentPage
        .inputText()
        .parent()
        .within(() => {
          cy.get('label').contains('Court office phone number').should('exist')
        })

      currentPage
        .inputText()
        .parent()
        .within(() => {
          cy.get('label').contains('Day').should('exist')
        })
      currentPage
        .inputText()
        .parent()
        .within(() => {
          cy.get('label').contains('Month').should('exist')
        })
      currentPage
        .inputText()
        .parent()
        .within(() => {
          cy.get('label').contains('Year').should('exist')
        })
    })

    it('should include the primary call to action button', () => {
      currentPage.govukButton().contains('Submit and view your report').should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.completeForm()
      currentPage.govukButton().contains('Submit and view your report').click()
      Page.verifyOnPage(ReportCompleted)
    })
  })
})
