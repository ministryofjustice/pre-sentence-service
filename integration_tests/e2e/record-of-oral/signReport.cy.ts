import BaseController from '../../../server/controllers/record-of-oral/baseController'
import Page from '../../pages/page'
import SignReport from '../../record-of-oral/signReport'
import ReportCompleted from '../../record-of-oral/reportCompleted'

context('Oral - Sign report page', () => {
  const path = `/${new BaseController().path}/0a15ce57-c46e-4b71-84f0-49dbed4bb81e/sign-report`
  let currentPage: SignReport

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.task('stubUserAccess')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(SignReport)
  })

  describe('Authenticated user accesses check your report', () => {
    it('should display the key details', () => {
      cy.get('#qa-key-details').within(() => {
        cy.get('h2').should('contain', 'CRN: X320741')
        cy.get('h1').should('contain', 'Lenore Marquez')
      })
    })

    it('should display as CANNOT START YET on the check report page', () => {
      cy.visit(`${path.substring(0, path.lastIndexOf('/'))}/check-report`)
      cy.get('.moj-task-list__item')
        .contains('Sign your report')
        .within(() => {
          cy.get('.govuk-tag').contains('Cannot start yet').should('exist')
        })
    })

    it('should include the required form elements', () => {
      currentPage
        .inputText()
        .parent()
        .within(() => {
          cy.get('label').contains('Report author').should('exist')
        })
      currentPage
        .inputText()
        .parent()
        .within(() => {
          cy.get('label').contains('Office').should('exist')
        })
      currentPage
        .inputText()
        .parent()
        .within(() => {
          cy.get('label').contains('Court office phone number').should('exist')
        })
      currentPage
        .inputText()
        .parent()
        .within(() => {
          cy.get('label').contains('Day').should('exist')
        })
      currentPage
        .inputText()
        .parent()
        .within(() => {
          cy.get('label').contains('Month').should('exist')
        })
      currentPage
        .inputText()
        .parent()
        .within(() => {
          cy.get('label').contains('Year').should('exist')
        })
    })

    it('should pre-populate the current user name if not stored in database', () => {
      cy.get('#reportAuthor').should('have.value', 'John Smith')
    })

    it('should display the start date from the database', () => {
      cy.get('.qa-start-date').contains('01/02/2022')
    })

    it('should include the primary call to action button', () => {
      currentPage.govukButton().contains('Submit and view your report').should('exist')
    })

    it('should re-render and display errors upon invalid form submission', () => {
      currentPage.clearForm()
      currentPage.govukButton().contains('Submit and view your report').click()
      Page.verifyOnPage(SignReport)
      currentPage.govukErrorSummary().should('exist')
      cy.get('#reportAuthor-error').should('exist')
      cy.get('#office-error').should('exist')
      cy.get('#officePhoneNumber-error').should('exist')
      cy.get('#officePhoneNumber').should('exist')
      cy.get('#completionDate-error').should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.completeForm()
      currentPage.govukButton().contains('Submit and view your report').click()
      Page.verifyOnPage(ReportCompleted)
    })

    it('should retain inputted data', () => {
      cy.get('#reportAuthor').should('have.value', 'Arthur Author')
      cy.get('#office').should('have.value', 'Sheffield Probation Office')
      cy.get('#officePhoneNumber').should('have.value', '0114 276 0760')
      cy.get('#completionDate-day').should('have.value', '27')
      cy.get('#completionDate-month').should('have.value', '10')
      cy.get('#completionDate-year').should('have.value', '2021')
    })

    it('should display as SAVED on the check report page', () => {
      cy.visit(`${path.substring(0, path.lastIndexOf('/'))}/check-report`)
      cy.get('.moj-task-list__item')
        .contains('Sign your report')
        .parent()
        .within(() => {
          cy.get('.govuk-tag').contains('Saved').should('exist')
        })
    })
  })
})
