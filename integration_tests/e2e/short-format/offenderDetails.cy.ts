import BaseController from '../../../server/controllers/short-format/baseController'
import Page from '../../pages/page'
import OffenderDetails from '../../short-format/offenderDetails'
import CourtDetails from '../../short-format/courtDetails'

context('Short Format - Offender details report page', () => {
  const path = `/${new BaseController().path}/0877ed35-e59a-4e94-b2bd-5d2283dd7dd7/offender-details`
  let currentPage: OffenderDetails

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.task('stubUserAccess')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(OffenderDetails)
  })

  describe('Authenticated user accesses offender details', () => {
    it('should display the key details', () => {
      cy.get('#qa-key-details').within(() => {
        cy.get('h1').should('contain', 'X320741')
        cy.get('h1').should('contain', 'Lenore Marquez')
      })
    })

    it('should display as SAVED on the check report page', () => {
      cy.visit(`${path.substring(0, path.lastIndexOf('/'))}/check-report`)
      cy.get('.moj-task-list__item')
        .contains('Offender details')
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

    it('should display the offender details', () => {
      currentPage.headingL2().contains('Name').should('exist')
      currentPage.govukBody().contains('Lenore Marquez').should('exist')

      currentPage.headingL2().contains('Date of birth').should('exist')
      currentPage.govukBody().contains('18/08/1979').should('exist')

      currentPage.headingL2().contains('Delius CRN').should('exist')
      currentPage.govukBody().contains('X320741').should('exist')
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
      currentPage.govukButton().contains('Save and continue').should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.completeForm()
      currentPage.govukButton().contains('Save and continue').click()
      Page.verifyOnPage(CourtDetails)
    })

    it('should retain inputted data', () => {
      cy.get('p').contains('Lenore Marquez').should('exist')
      cy.get('p').contains('18/08/1979').should('exist')
      cy.get('p').contains('X320741').should('exist')
      cy.get('textarea').contains('Some address').should('exist')
      cy.get('p').contains('A123467B').should('exist')
    })
  })
})
