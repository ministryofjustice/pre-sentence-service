import BaseController from '../../../server/controllers/short-format/baseController'
import Page from '../../pages/page'
import SourcesOfInformation from '../../short-format/sourcesOfInformation'
import CheckReport from '../../short-format/checkReport'

context('Short Format - Sources of information report page', () => {
  const path = `/${new BaseController().path}/0877ed35-e59a-4e94-b2bd-5d2283dd7dd7/sources-of-information`
  let currentPage: SourcesOfInformation

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.task('stubUserAccess')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(SourcesOfInformation)
  })

  describe('Authenticated user accesses sources of information', () => {
    it('should display the key details', () => {
      cy.get('#qa-key-details').within(() => {
        cy.get('h1').should('contain', 'X320741')
        cy.get('h1').should('contain', 'Lenore Marquez')
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
      currentPage.govukButton().contains('Save and continue').should('exist')
    })

    it('should re-render and display errors upon invalid form submission', () => {
      currentPage.clearForm()
      currentPage.govukButton().contains('Save and continue').click()
      Page.verifyOnPage(SourcesOfInformation)
      currentPage.govukErrorSummary().should('exist')
      cy.get('#sourcesOfInformation-error').should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.completeForm()
      currentPage.govukButton().contains('Save and continue').click()
      Page.verifyOnPage(CheckReport)
    })

    it('should retain inputted data', () => {
      cy.get('.govuk-checkboxes__input').each($el => {
        cy.wrap($el).should('be.checked')
      })
      cy.get('#otherSourceOfInformation').should('have.value', '<p>Some other information source</p>')
    })
  })
})
