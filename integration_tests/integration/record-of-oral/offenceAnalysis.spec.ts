import BaseController from '../../../server/controllers/record-of-oral/baseController'
import Page from '../../pages/page'
import OffenceAnalysis from '../../record-of-oral/offenceAnalysis'
import OffenderAssessment from '../../record-of-oral/offenderAssessment'

context('Offence analysis report page', () => {
  const path = `/${new BaseController().path}/offence-analysis`
  let currentPage

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

    it('should move to correct screen upon valid form submission', () => {
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(OffenderAssessment)
    })
  })
})
