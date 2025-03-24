import BaseController from '../../../server/controllers/record-of-oral/baseController'
import Page from '../../pages/page'
import OffenceDetails from '../../record-of-oral/offenceDetails'
import OffenceAnalysis from '../../record-of-oral/offenceAnalysis'
import { enterRichText } from '../../utils/helpers'

context('Oral - Offence details report page', () => {
  const path = `/${new BaseController().path}/0a15ce57-c46e-4b71-84f0-49dbed4bb81e/offence-details`
  let currentPage: OffenceDetails

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.task('stubUserAccess')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(OffenceDetails)
  })

  describe('Authenticated user accesses offence details', () => {
    it('should display the key details', () => {
      cy.get('#qa-key-details').within(() => {
        cy.get('h2').should('contain', 'CRN: X320741')
        cy.get('h1').should('contain', 'Lenore Marquez')
      })
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
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.completeForm()
      currentPage.govukButton().contains('Save and continue').click()
      Page.verifyOnPage(OffenceAnalysis)
    })

    it('should retain inputted data', () => {
      cy.get('#mainOffence').should('have.value', '<p>Some main offence</p>')
      cy.get('#otherOffences').should('have.value', '<p>Some other offences</p>')
    })

    xit('should auto save inputted data in a CKEditor instance', () => {
      enterRichText('#otherOffences', 'Some other offence data should auto save')
      enterRichText('#mainOffence', 'Some main offence')
      // eslint-disable-next-line
      cy.wait(500) // CKEditor autosave includes a wait
      cy.visit(path)
      cy.get('#otherOffences').should('have.value', '<p>Some other offence data should auto save</p>')
    })
  })
})
