import BaseController from '../../../server/controllers/record-of-oral/baseController'
import Page from '../../pages/page'
import CourtDetails from '../../record-of-oral/courtDetails'
import OffenceDetails from '../../record-of-oral/offenceDetails'

context('Sentencing court details report page', () => {
  const path = `/${new BaseController().path}/0a15ce57-c46e-4b71-84f0-49dbed4bb81e/court-details`
  let currentPage: CourtDetails

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(CourtDetails)
  })

  describe('Authenticated user accesses sentencing court details', () => {
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
        .inputText()
        .parent()
        .within(() => {
          cy.get('label').contains('Day').should('exist')
          cy.get('label').contains('Month').should('exist')
          cy.get('label').contains('Year').should('exist')
        })
    })

    it('should include the primary call to action button', () => {
      currentPage.govukButton().contains('Continue').should('exist')
    })

    it('should re-render and display errors upon invalid form submission', () => {
      currentPage.clearForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(CourtDetails)
      currentPage.govukErrorSummary().should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.clearForm()
      currentPage.completeForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(OffenceDetails)
    })
  })
})
