import BaseController from '../../../server/controllers/short-format/baseController'
import Page from '../../pages/page'
import OffenceDetails from '../../short-format/offenceDetails'
import OffenceAnalysis from '../../short-format/offenceAnalysis'

context('Short Format - Offence details report page', () => {
  const path = `/${new BaseController().path}/0877ed35-e59a-4e94-b2bd-5d2283dd7dd7/offence-details`
  let currentPage: OffenceDetails

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(OffenceDetails)
  })

  describe('Authenticated user accesses offence details', () => {
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
          cy.get('label').contains('Main offence and date').should('exist')
          cy.get('label').contains('Other offence(s) and dates (if applicable)').should('exist')
          cy.get('label').contains('Brief summary of the offence').should('exist')
        })
    })

    it('should include the primary call to action button', () => {
      currentPage.govukButton().contains('Continue').should('exist')
    })

    it('should re-render and display errors upon invalid form submission', () => {
      currentPage.clearForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(OffenceDetails)
      currentPage.govukErrorSummary().should('exist')
      cy.get('#mainOffence-error').should('exist')
      cy.get('#offenceSummary-error').should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.clearForm()
      currentPage.completeForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(OffenceAnalysis)
    })

    it('should retain inputted data', () => {
      cy.get('#mainOffence').should('have.value', 'Some main offence')
      cy.get('#otherOffences').should('have.value', 'Some other offences')
      cy.get('#offenceSummary').should('have.value', 'Some offence summary')
    })
  })
})
