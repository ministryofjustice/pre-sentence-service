import BaseController from '../../../server/controllers/short-format/baseController'
import Page from '../../pages/page'
import OffenceAnalysis from '../../short-format/offenceAnalysis'
import OffenderAssessment from '../../short-format/offenderAssessment'

context('Short Format - Offence analysis report page', () => {
  const path = `/${new BaseController().path}/0877ed35-e59a-4e94-b2bd-5d2283dd7dd7/offence-analysis`
  let currentPage: OffenceAnalysis

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.task('stubUserAccess')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(OffenceAnalysis)
  })

  describe('Authenticated user accesses offence analysis', () => {
    it('should display the key details', () => {
      cy.get('#qa-key-details').within(() => {
        cy.get('h1').should('contain', 'X320741')
        cy.get('h1').should('contain', 'Lenore Marquez')
      })
    })

    it('should display as NOT STARTED on the check report page', () => {
      cy.visit(`${path.substring(0, path.lastIndexOf('/'))}/check-report`)
      cy.get('.moj-task-list__item')
        .contains('Offence analysis')
        .parent()
        .first()
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

    it('should include the primary call to action button', () => {
      currentPage.govukButton().contains('Save and continue').should('exist')
    })

    it('should re-render and display errors upon invalid form submission', () => {
      currentPage.clearForm()
      currentPage.govukButton().contains('Save and continue').click()
      Page.verifyOnPage(OffenceAnalysis)
      currentPage.govukErrorSummary().should('exist')
      cy.get('#offenceAnalysis-error').should('exist')
      cy.get('#patternOfOffendingBehaviour-error').should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.clearForm()
      currentPage.completeForm()
      currentPage.govukButton().contains('Save and continue').click()
      Page.verifyOnPage(OffenderAssessment)
    })

    it('should retain inputted data', () => {
      cy.get('#offenceAnalysis').should('have.value', '<p>Some offence analysis</p>')
      cy.get('#patternOfOffendingBehaviour').should(
        'have.value',
        '<p>Some patterns of offending behaviour analysis</p>'
      )
    })

    it('should display as SAVED on the check report page', () => {
      cy.visit(`${path.substring(0, path.lastIndexOf('/'))}/check-report`)
      cy.get('.moj-task-list__item')
        .contains('Offence analysis')
        .parent()
        .within(() => {
          cy.get('.govuk-tag').contains('Saved').should('exist')
        })
    })
  })
})
