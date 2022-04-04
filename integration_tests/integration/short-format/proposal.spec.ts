import BaseController from '../../../server/controllers/short-format/baseController'
import Page from '../../pages/page'
import Proposal from '../../short-format/proposal'
import SourcesOfInformation from '../../short-format/sourcesOfInformation'

context('Short Format - Proposal report page', () => {
  const path = `/${new BaseController().path}/0877ed35-e59a-4e94-b2bd-5d2283dd7dd7/proposal`
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
    it('should display as NOT STARTED on the check report page', () => {
      cy.visit(`${path.substring(0, path.lastIndexOf('/'))}/check-report`)
      cy.get('.moj-task-list__item')
        .contains('Proposal')
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
          cy.get('label').contains('Enter a proposed sentence').should('exist')
        })
    })

    it('should include the primary call to action button', () => {
      currentPage.govukButton().contains('Continue').should('exist')
    })

    it('should re-render and display errors upon invalid form submission', () => {
      currentPage.clearForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(Proposal)
      currentPage.govukErrorSummary().should('exist')
      cy.get('#equalityAndDiversity-error').should('exist')
      cy.get('#proposal-error').should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.clearForm()
      currentPage.completeForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(SourcesOfInformation)
    })

    it('should retain inputted data', () => {
      cy.get('legend')
        .contains(
          'I confirm that equalities and diversity information has been considered as part of preparing the report and proposal'
        )
        .parent()
        .within(() => {
          cy.contains('label', 'Yes')
            .prev()
            .should('have.attr', 'type', 'radio')
            .should('have.value', 'yes')
            .should('be.checked')
        })

      cy.get('#proposal').should('have.value', 'Some proposal text')
    })

    it('should display as SAVED on the check report page', () => {
      cy.visit(`${path.substring(0, path.lastIndexOf('/'))}/check-report`)
      cy.get('.moj-task-list__item')
        .contains('Proposal')
        .parent()
        .within(() => {
          cy.get('.govuk-tag').contains('Saved').should('exist')
        })
    })
  })
})
