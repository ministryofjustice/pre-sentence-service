import BaseController from '../../../server/controllers/record-of-oral/baseController'
import Page from '../../pages/page'
import OffenceAnalysis from '../../record-of-oral/offenceAnalysis'
import OffenderAssessment from '../../record-of-oral/offenderAssessment'

context('Offence analysis report page', () => {
  const path = `/${new BaseController().path}/0a15ce57-c46e-4b71-84f0-49dbed4bb81e/offence-analysis`
  let currentPage: OffenceAnalysis

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(OffenceAnalysis)
  })

  describe('Authenticated user accesses offence analysis', () => {
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
          cy.get('label').contains('Provide an analysis of the offence(s), including victim impact.').should('exist')
        })

      currentPage
        .radioButtons()
        .parent()
        .within(() => {
          cy.get('legend').contains('Is current offending part of a pattern of offending behaviour?').should('exist')
        })

      currentPage
        .radioButtons()
        .parent()
        .within(() => {
          cy.get('legend').contains('Does current offending represent an escalation in seriousness?').should('exist')
        })
    })

    it('should include the primary call to action button', () => {
      currentPage.govukButton().contains('Continue').should('exist')
    })

    it('should re-render and display errors upon invalid form submission', () => {
      currentPage.clearForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(OffenceAnalysis)
      currentPage.govukErrorSummary().should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.completeForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(OffenderAssessment)
    })

    it('should retain inputted data', () => {
      cy.get('#offenceAnalysis').should('have.value', 'Some offence analysis')
      cy.get('legend')
        .contains('Is current offending part of a pattern of offending behaviour?')
        .parent()
        .within(() => {
          cy.contains('label', 'Yes')
            .prev()
            .should('have.attr', 'type', 'radio')
            .should('have.value', 'yes')
            .should('be.checked')
        })
      cy.get('legend')
        .contains('Does current offending represent an escalation in seriousness?')
        .parent()
        .within(() => {
          cy.contains('label', 'Yes')
            .prev()
            .should('have.attr', 'type', 'radio')
            .should('have.value', 'yes')
            .should('be.checked')
        })
    })
  })
})
