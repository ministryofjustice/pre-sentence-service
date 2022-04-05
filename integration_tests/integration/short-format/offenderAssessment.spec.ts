import BaseController from '../../../server/controllers/short-format/baseController'
import Page from '../../pages/page'
import OffenderAssessment from '../../short-format/offenderAssessment'
import RiskAssessment from '../../short-format/riskAssessment'

context('Short Format - Offender assessment report page', () => {
  const path = `/${new BaseController().path}/0877ed35-e59a-4e94-b2bd-5d2283dd7dd7/offender-assessment`
  let currentPage: OffenderAssessment

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(OffenderAssessment)
  })

  describe('Authenticated user accesses offender assessment', () => {
    it('should display as NOT STARTED on the check report page', () => {
      cy.visit(`${path.substring(0, path.lastIndexOf('/'))}/check-report`)
      cy.get('.moj-task-list__item')
        .contains('Offender assessment')
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
          cy.get('legend')
            .contains(
              'Select any factors relating to offending behaviour and the individual’s need, including any protective factors.'
            )
            .should('exist')
        })

      currentPage
        .radioButtons()
        .parent()
        .within(() => {
          cy.get('legend').contains('Is there evidence of the offender experiencing trauma?').should('exist')
        })

      currentPage
        .radioButtons()
        .parent()
        .within(() => {
          cy.get('legend')
            .contains(
              'Does the offender have caring responsibilities for children or adults, or have they ever had caring responsibilities for children or adults?'
            )
            .should('exist')
        })
    })

    it('should include the primary call to action button', () => {
      currentPage.govukButton().contains('Continue').should('exist')
    })

    it('should re-render and display errors upon invalid form submission', () => {
      currentPage.clearForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(OffenderAssessment)
      currentPage.govukErrorSummary().should('exist')
      cy.get('#experienceOfTrauma-error').should('exist')
      cy.get('#caringResponsibilities-error').should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.clearForm()
      currentPage.completeForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(RiskAssessment)
    })

    it('should retain inputted data', () => {
      cy.get('.govuk-checkboxes__input').each($el => {
        cy.wrap($el).should('be.checked')
      })
      cy.get('legend')
        .contains('Is there evidence of the offender experiencing trauma?')
        .parent()
        .within(() => {
          cy.contains('label', 'Yes')
            .prev()
            .should('have.attr', 'type', 'radio')
            .should('have.value', 'yes')
            .should('be.checked')
        })
      cy.get('legend')
        .contains(
          'Does the offender have caring responsibilities for children or adults, or have they ever had caring responsibilities for children or adults?'
        )
        .parent()
        .within(() => {
          cy.contains('label', 'Yes')
            .prev()
            .should('have.attr', 'type', 'radio')
            .should('have.value', 'yes')
            .should('be.checked')
        })
    })

    it('should display as SAVED on the check report page', () => {
      cy.visit(`${path.substring(0, path.lastIndexOf('/'))}/check-report`)
      cy.get('.moj-task-list__item')
        .contains('Offender assessment')
        .parent()
        .within(() => {
          cy.get('.govuk-tag').contains('Saved').should('exist')
        })
    })
  })
})
