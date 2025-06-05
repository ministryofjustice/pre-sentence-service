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
    cy.task('stubUserAccess')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(RiskAssessment)
  })

  describe('Authenticated user accesses risk assessment', () => {
    it('should display the key details', () => {
      cy.get('#qa-key-details')
        .first()
        .within(() => {
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

      currentPage
        .mojSideNavigation()
        .first()
        .within(() => {
          cy.get('.moj-side-navigation__item')
            .contains(currentPage.title)
            .parent()
            .should('have.class', 'moj-side-navigation__item--active')
        })
    })

    it('should include the required form elements', () => {
      currentPage
        .richTextArea()
        .parent()
        .first()
        .within(() => {
          cy.get('label').contains('Likelihood of further offending').should('exist')
        })

      currentPage
        .richTextArea()
        .parent()
        .first()
        .within(() => {
          cy.get('label').contains('Risk of serious harm').should('exist')
        })

      currentPage
        .radioButtons()
        .parent()
        .first()
        .within(() => {
          cy.get('legend').contains('Response to previous supervision').should('exist')
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
      cy.get('#likelihoodOfReOffending-error').should('exist')
      cy.get('#riskOfSeriousHarm-error').should('exist')
      cy.get('#responseToPreviousSupervision-error').should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.clearForm()
      currentPage.completeForm()
      currentPage.govukButton().contains('Save and continue').click()
      Page.verifyOnPage(Proposal)
    })

    it('should retain inputted data', () => {
      cy.get('#likelihoodOfReOffending').should('contain', '<p>Some likelihood of further offending</p>')
      cy.get('#riskOfSeriousHarm').should('contain', '<p>Some RoSH evidence</p>')
      cy.get('legend')
        .contains('Response to previous supervision')
        .parent()
        .first()
        .within(() => {
          cy.contains('label', 'Good')
            .prev()
            .should('have.attr', 'type', 'radio')
            .should('have.value', 'Good')
            .should('be.checked')
        })
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
