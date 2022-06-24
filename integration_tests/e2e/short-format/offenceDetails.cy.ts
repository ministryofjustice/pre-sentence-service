import BaseController from '../../../server/controllers/short-format/baseController'
import Page from '../../pages/page'
import OffenceDetails from '../../short-format/offenceDetails'
import OffenceAnalysis from '../../short-format/offenceAnalysis'
import { enterRichText } from '../../utils/helpers'

context('Short Format - Offence details report page', () => {
  const path = `/${new BaseController().path}/0877ed35-e59a-4e94-b2bd-5d2283dd7dd7/offence-details`
  let currentPage: OffenceDetails

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(OffenceDetails)
  })

  describe('Authenticated user accesses offence details', () => {
    it('should display the key details', () => {
      cy.get('#qa-key-details').within(() => {
        cy.get('h2').should('contain', 'CRN: DX12340A')
        cy.get('h1').should('contain', 'Lenore Marquez')
      })
    })

    it('should display as NOT STARTED on the check report page', () => {
      cy.visit(`${path.substring(0, path.lastIndexOf('/'))}/check-report`)
      cy.get('.moj-task-list__item')
        .contains('Offence details')
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
        .richTextArea()
        .parent()
        .within(() => {
          cy.get('label').contains('Main offence and date').should('exist')
          cy.get('label').contains('Other offence(s) and dates (if applicable)').should('exist')
          cy.get('label').contains('Brief summary of the offence').should('exist')
        })
    })

    it('should include the primary call to action button', () => {
      currentPage.govukButton().contains('Save and continue').should('exist')
    })

    it('should re-render and display errors upon invalid form submission', () => {
      currentPage.clearForm()
      currentPage.govukButton().contains('Save and continue').click()
      Page.verifyOnPage(OffenceDetails)
      currentPage.govukErrorSummary().should('exist')
      cy.get('#mainOffence-error').should('exist')
      cy.get('#offenceSummary-error').should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.clearForm()
      currentPage.completeForm()
      currentPage.govukButton().contains('Save and continue').click()
      Page.verifyOnPage(OffenceAnalysis)
    })

    it('should retain inputted data', () => {
      cy.get('#mainOffence').should('have.value', '<p>Some main offence</p>')
      cy.get('#otherOffences').should('have.value', '<p>Some other offences</p>')
      cy.get('#offenceSummary').should('have.value', '<p>Some offence summary</p>')
    })

    it('should display as SAVED on the check report page', () => {
      cy.visit(`${path.substring(0, path.lastIndexOf('/'))}/check-report`)
      cy.get('.moj-task-list__item')
        .contains('Offence details')
        .parent()
        .within(() => {
          cy.get('.govuk-tag').contains('Saved').should('exist')
        })
    })

    it('should auto save inputted data in a CKEditor instance', () => {
      enterRichText('#otherOffences', 'Some other offence data should auto save')
      enterRichText('#mainOffence', 'Some main offence')
      // eslint-disable-next-line
      cy.wait(500) // CKEditor autosave includes a wait
      cy.reload()
      cy.get('#otherOffences').should('have.value', '<p>Some other offence data should auto save</p>')
    })
  })
})
