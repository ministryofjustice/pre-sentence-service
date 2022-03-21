import BaseController from '../../../server/controllers/short-format/baseController'
import Page from '../../pages/page'
import RiskAssessment from '../../short-format/riskAssessment'
import Proposal from '../../short-format/proposal'

context('Short Format - Risk assessment report page', () => {
  const path = `/${new BaseController().path}/0877ed35-e59a-4e94-b2bd-5d2283dd7dd7/risk-assessment`
  let currentPage: RiskAssessment

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(RiskAssessment)
  })

  describe('Authenticated user accesses risk assessment', () => {
    it('should include side navigation and current page should appear as active', () => {
      currentPage.mojSideNavigation().should('exist')

      currentPage.mojSideNavigation().within(() => {
        cy.get('.moj-side-navigation__item')
          .contains(currentPage.title)
          .parent()
          .should('have.class', 'moj-side-navigation__item--active')
      })
    })

    it('should include the required form elements', () => {
      currentPage
        .textArea()
        .parent()
        .within(() => {
          cy.get('label').contains('Likelihood of further offending').should('exist')
        })

      currentPage
        .textArea()
        .parent()
        .within(() => {
          cy.get('label').contains('Risk of serious harm').should('exist')
        })

      currentPage
        .radioButtons()
        .parent()
        .within(() => {
          cy.get('legend').contains('Response to previous supervision').should('exist')
        })
    })

    it('should include the primary call to action button', () => {
      currentPage.govukButton().contains('Continue').should('exist')
    })

    it('should re-render and display errors upon invalid form submission', () => {
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(RiskAssessment)
      currentPage.govukErrorSummary().should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.completeForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(Proposal)
    })
  })
})
