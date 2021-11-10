import BaseController from '../../../server/controllers/short-format/baseController'
import Page from '../../pages/page'
import OffenderAssessment from '../../short-format/offenderAssessment'
import RiskAssessment from '../../short-format/riskAssessment'

context('Offender assessment report page', () => {
  const path = `/${new BaseController().path}/offender-assessment`
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
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(OffenderAssessment)
      currentPage.govukErrorSummary().should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.completeForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(RiskAssessment)
    })
  })
})