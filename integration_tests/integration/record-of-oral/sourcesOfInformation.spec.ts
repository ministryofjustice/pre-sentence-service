import BaseController from '../../../server/controllers/record-of-oral/baseController'
import Page from '../../pages/page'
import SourcesOfInformation from '../../record-of-oral/sourcesOfInformation'
import CheckReport from '../../record-of-oral/checkReport'

context('Sources of information report page', () => {
  const path = `/${new BaseController().path}/sources-of-information`
  let currentPage

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(SourcesOfInformation)
  })

  describe('Authenticated user accesses sources of information', () => {
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

    it('should move to correct screen upon valid form submission', () => {
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(CheckReport)
    })
  })
})