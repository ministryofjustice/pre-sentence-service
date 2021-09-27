import BaseController from '../../../server/controllers/record-of-oral/baseController'
import Page from '../../pages/page'
import RiskAssessment from '../../record-of-oral/riskAssessment'
import Proposal from '../../record-of-oral/proposal'

context('Risk assessment report page', () => {
  const path = `/${new BaseController().path}/risk-assessment`
  let currentPage

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
      currentPage.headingL2().contains('Static Assessment Scores').should('exist')

      currentPage
        .inputText()
        .parent()
        .within(() => {
          cy.get('label').contains('Tool name').should('exist')
        })

      currentPage
        .radioButtons()
        .parent()
        .within(() => {
          cy.get('legend').contains('Level').should('exist')
        })

      currentPage.headingL2().contains('Risk of serious harm').should('exist')

      currentPage
        .textArea()
        .parent()
        .within(() => {
          cy.get('label').contains('Evidence for risk level').should('exist')
        })

      currentPage.headingL2().contains('Response to previous supervision').should('exist')

      currentPage
        .radioButtons()
        .parent()
        .within(() => {
          cy.get('legend').contains('Response').should('exist')
        })
    })

    it('should include the primary call to action button', () => {
      currentPage.govukButton().contains('Continue').should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(Proposal)
    })
  })
})
