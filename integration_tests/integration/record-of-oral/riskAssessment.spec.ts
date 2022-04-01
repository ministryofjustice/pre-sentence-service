import BaseController from '../../../server/controllers/record-of-oral/baseController'
import Page from '../../pages/page'
import RiskAssessment from '../../record-of-oral/riskAssessment'
import Proposal from '../../record-of-oral/proposal'

context('Oral - Risk assessment report page', () => {
  const path = `/${new BaseController().path}/0a15ce57-c46e-4b71-84f0-49dbed4bb81e/risk-assessment`
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
    it('should display as NOT STARTED on the check report page', () => {
      cy.visit(`${path.substring(0, path.lastIndexOf('/'))}/check-report`)
      cy.get('.moj-task-list__item')
        .contains('Risk assessment')
        .parent()
        .within(() => {
          cy.get('.govuk-tag').contains('Not started').should('exist')
        })
    })

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

    it('should re-render and display errors upon invalid form submission', () => {
      currentPage.clearForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(RiskAssessment)
      currentPage.govukErrorSummary().should('exist')
      cy.get('#assessmentTool1-error').should('exist')
      cy.get('#assessmentLevel1-error').should('exist')
      cy.get('#yourAssessment-error').should('exist')
      cy.get('#evidenceForRiskLevel-error').should('exist')
      cy.get('#riskOfSeriousHarm-error').should('exist')
      cy.get('#responseToPreviousSupervision-error').should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.completeForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(Proposal)
    })

    it('should retain inputted data', () => {
      cy.get('#assessmentTool1').should('have.value', 'Some tool name')
      cy.get('legend')
        .eq(0)
        .contains('Level')
        .parent()
        .within(() => {
          cy.contains('label', 'High')
            .prev()
            .should('have.attr', 'type', 'radio')
            .should('have.value', 'High')
            .should('be.checked')
        })

      cy.get('#assessmentTool2').should('have.value', 'Some tool name')
      cy.get('legend')
        .eq(1)
        .contains('Level')
        .parent()
        .within(() => {
          cy.contains('label', 'High')
            .prev()
            .should('have.attr', 'type', 'radio')
            .should('have.value', 'High')
            .should('be.checked')
        })

      cy.get('#assessmentTool3').should('have.value', 'Some tool name')
      cy.get('legend')
        .eq(2)
        .contains('Level')
        .parent()
        .within(() => {
          cy.contains('label', 'High')
            .prev()
            .should('have.attr', 'type', 'radio')
            .should('have.value', 'High')
            .should('be.checked')
        })

      cy.get('#assessmentTool4').should('have.value', 'Some tool name')
      cy.get('legend')
        .eq(3)
        .contains('Level')
        .parent()
        .within(() => {
          cy.contains('label', 'High')
            .prev()
            .should('have.attr', 'type', 'radio')
            .should('have.value', 'High')
            .should('be.checked')
        })

      cy.get('#yourAssessment').should('have.value', 'Some assessment')

      cy.get('#evidenceForRiskLevel').should('have.value', 'Some RoSH evidence')
      cy.get('legend')
        .contains('Response')
        .parent()
        .within(() => {
          cy.contains('label', 'Good')
            .prev()
            .should('have.attr', 'type', 'radio')
            .should('have.value', 'Good')
            .should('be.checked')
        })
      cy.get('#responseToPreviousSupervision').click()
    })

    it('should display as SAVED on the check report page', () => {
      cy.visit(`${path.substring(0, path.lastIndexOf('/'))}/check-report`)
      cy.get('.moj-task-list__item')
        .contains('Risk assessment')
        .parent()
        .within(() => {
          cy.get('.govuk-tag').contains('Saved').should('exist')
        })
    })
  })
})
