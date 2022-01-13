import BaseController from '../../../server/controllers/record-of-oral/baseController'
import Page from '../../pages/page'
import OffenderDetails from '../../record-of-oral/offenderDetails'
import CourtDetails from '../../record-of-oral/courtDetails'

context('Offender details report page', () => {
  const path = `/${new BaseController().path}/0a15ce57-c46e-4b71-84f0-49dbed4bb81e/offender-details`
  let currentPage: OffenderDetails

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(OffenderDetails)
  })

  describe('Authenticated user accesses offender details', () => {
    it('should include side navigation and current page should appear as active', () => {
      currentPage.mojSideNavigation().should('exist')

      currentPage.mojSideNavigation().within(() => {
        cy.get('.moj-side-navigation__item')
          .contains(currentPage.title)
          .parent()
          .should('have.class', 'moj-side-navigation__item--active')
      })
    })

    it('should display the offender details', () => {
      currentPage.headingL2().contains('Name').should('exist')
      currentPage.govukBody().contains('Lenore Marquez').should('exist')

      currentPage.headingL2().contains('Date of birth').should('exist')
      currentPage.govukBody().contains('18/08/1979').should('exist')

      currentPage.headingL2().contains('Delius CRN').should('exist')
      currentPage.govukBody().contains('DX12340A').should('exist')
    })

    it('should include the required form elements', () => {
      currentPage
        .textArea()
        .parent()
        .within(() => {
          cy.get('label').contains('Address').should('exist')
        })

      currentPage
        .inputText()
        .parent()
        .within(() => {
          cy.get('label').contains('PNC ID').should('exist')
        })
    })

    it('should include the primary call to action button', () => {
      currentPage.govukButton().contains('Continue').should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.completeForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(CourtDetails)
    })
  })
})
