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
    cy.task('stubUserAccess')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(RiskAssessment)
  })

  describe('Authenticated user accesses risk assessment', () => {
    it('should display the key details', () => {
      cy.get('#qa-key-details').within(() => {
        cy.get('h1').should('contain', 'X320741')
        cy.get('h1').should('contain', 'Lenore Marquez')
      })
    })

    it('should display as NOT STARTED on the check report page', () => {
      cy.visit(`${path.substring(0, path.lastIndexOf('/'))}/check-report`)
      cy.get('.moj-task-list__item')
        .contains('Risk assessment')
        .parent()
        .first()
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

    it('should include the primary call to action button', () => {
      currentPage.govukButton().contains('Save and continue').should('exist')
    })

    it('should re-render and display errors upon invalid form submission', () => {
      currentPage.clearForm()
      currentPage.govukButton().contains('Save and continue').click()
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
      currentPage.govukButton().contains('Save and continue').click()
      Page.verifyOnPage(Proposal)
    })

    it('should retain inputted data', () => {
      cy.get('#assessmentTool1').should('have.value', 'Some tool name')
      cy.get('legend')
        .eq(0)
        .contains('Level')
        .parent()
        .first()
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
        .first()
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
        .first()
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
        .first()
        .within(() => {
          cy.contains('label', 'High')
            .prev()
            .should('have.attr', 'type', 'radio')
            .should('have.value', 'High')
            .should('be.checked')
        })

      cy.get('#yourAssessment').should('have.value', '<p>Some assessment</p>')

      cy.get('#evidenceForRiskLevel').should('have.value', '<p>Some RoSH evidence</p>')
      cy.get('legend')
        .contains('Response')
        .parent()
        .first()
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
        .first()
        .within(() => {
          cy.get('.govuk-tag').contains('Saved').should('exist')
        })
    })
  })
})
