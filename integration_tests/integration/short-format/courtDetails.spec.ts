import BaseController from '../../../server/controllers/short-format/baseController'
import Page from '../../pages/page'
import CourtDetails from '../../short-format/courtDetails'
import OffenceDetails from '../../short-format/offenceDetails'

context('Short Format - Sentencing court details report page', () => {
  const path = `/${new BaseController().path}/0877ed35-e59a-4e94-b2bd-5d2283dd7dd7/court-details`
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
    it('should display as SAVED on the check report page', () => {
      cy.visit(`${path.substring(0, path.lastIndexOf('/'))}/check-report`)
      cy.get('.moj-task-list__item')
        .contains('Sentencing court details')
        .parent()
        .within(() => {
          cy.get('.govuk-tag').contains('Saved').should('exist')
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
      cy.get('#dateOfHearing-error').should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.clearForm()
      currentPage.completeForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(OffenceDetails)
    })

    it('should retain inputted data', () => {
      cy.get('p').contains('Sheffield Magistrates Court').should('exist')
      cy.get('p').contains('South Yorkshire').should('exist')
      currentPage
        .inputText()
        .parent()
        .within(() => {
          cy.get('#dateOfHearing-day').should('have.value', '27')
          cy.get('#dateOfHearing-month').should('have.value', '10')
          cy.get('#dateOfHearing-year').should('have.value', '2021')
        })
    })
  })
})
