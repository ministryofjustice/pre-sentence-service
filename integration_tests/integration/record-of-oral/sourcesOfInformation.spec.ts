import BaseController from '../../../server/controllers/record-of-oral/baseController'
import Page from '../../pages/page'
import SourcesOfInformation from '../../record-of-oral/sourcesOfInformation'
import CheckReport from '../../record-of-oral/checkReport'

context('Oral - Sources of information report page', () => {
  const path = `/${new BaseController().path}/0a15ce57-c46e-4b71-84f0-49dbed4bb81e/sources-of-information`
  let currentPage: SourcesOfInformation

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(SourcesOfInformation)
  })

  describe('Authenticated user accesses sources of information', () => {
    it('should display the key details', () => {
      cy.get('#qa-key-details').within(() => {
        cy.get('h2').should('contain', 'CRN: DX12340A')
        cy.get('h1').should('contain', 'Lenore Marquez')
      })
    })

    it('should display as NOT STARTED on the check report page', () => {
      cy.visit(`${path.substring(0, path.lastIndexOf('/'))}/check-report`)
      cy.get('.moj-task-list__item')
        .contains('Not started')
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
      currentPage
        .checkboxes()
        .parent()
        .within(() => {
          cy.get('legend').contains('Select the relevant options').should('exist')
        })
    })

    it('should include the primary call to action button', () => {
      currentPage.govukButton().contains('Continue').should('exist')
    })

    it('should re-render and display errors upon invalid form submission', () => {
      currentPage.clearForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(SourcesOfInformation)
      currentPage.govukErrorSummary().should('exist')
      cy.get('#sourcesOfInformation-error').should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.completeForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(CheckReport)
    })

    it('should retain inputted data', () => {
      cy.get('.govuk-checkboxes__input').each($el => {
        cy.wrap($el).should('be.checked')
      })
      cy.get('#otherSourceOfInformation').should('have.value', '<p>Some other information source</p>')
    })

    it('should display as SAVED on the check report page', () => {
      cy.visit(`${path.substring(0, path.lastIndexOf('/'))}/check-report`)
      cy.get('.moj-task-list__item')
        .contains('Sources of information')
        .parent()
        .within(() => {
          cy.get('.govuk-tag').contains('Saved').should('exist')
        })
    })
  })
})
