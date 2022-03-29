import BaseController from '../../../server/controllers/record-of-oral/baseController'
import Page from '../../pages/page'
import OffenceDetails from '../../record-of-oral/offenceDetails'
import OffenceAnalysis from '../../record-of-oral/offenceAnalysis'

context('Oral - Offence details report page', () => {
  const path = `/${new BaseController().path}/0a15ce57-c46e-4b71-84f0-49dbed4bb81e/offence-details`
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
    it('should display as SAVED on the check report page', () => {
      cy.visit(`${path.substring(0, path.lastIndexOf('/'))}/check-report`)
      cy.get('.moj-task-list__item')
        .contains('Offence details')
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
        .textArea()
        .parent()
        .within(() => {
          cy.get('label').contains('Main offence and date').should('exist')
        })

      currentPage
        .textArea()
        .parent()
        .within(() => {
          cy.get('label').contains('Other offence(s) and dates (if applicable)').should('exist')
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
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.completeForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(OffenceAnalysis)
    })

    it('should retain inputted data', () => {
      cy.get('#mainOffence').should('have.value', 'Some main offence')
      cy.get('#otherOffences').should('have.value', 'Some other offences')
    })
  })
})
