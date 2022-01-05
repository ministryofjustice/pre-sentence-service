import BaseController from '../../../server/controllers/record-of-oral/baseController'
import Page from '../../pages/page'
import Proposal from '../../record-of-oral/proposal'
import SourcesOfInformation from '../../record-of-oral/sourcesOfInformation'

context('Proposal report page', () => {
  const path = `/${new BaseController().path}/0a15ce57-c46e-4b71-84f0-49dbed4bb81e/proposal`
  let currentPage: Proposal

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(Proposal)
  })

  describe('Authenticated user accesses proposal', () => {
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
        .radioButtons()
        .parent()
        .within(() => {
          cy.get('legend')
            .contains(
              'I confirm that equalities and diversity information has been considered as part of preparing the report and proposal'
            )
            .should('exist')
        })

      currentPage
        .textArea()
        .parent()
        .within(() => {
          cy.get('label')
            .contains('Enter a proposed sentence (including length and any sentence components)')
            .should('exist')
        })
    })

    it('should include the primary call to action button', () => {
      currentPage.govukButton().contains('Continue').should('exist')
    })

    it('should re-render and display errors upon invalid form submission', () => {
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(Proposal)
      currentPage.govukErrorSummary().should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.completeForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(SourcesOfInformation)
    })
  })
})
