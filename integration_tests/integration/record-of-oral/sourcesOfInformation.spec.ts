import BaseController from '../../../server/controllers/record-of-oral/baseController'
import Page from '../../pages/page'
import SourcesOfInformation from '../../record-of-oral/sourcesOfInformation'
import CheckReport from '../../record-of-oral/checkReport'

context('Sources of information report page', () => {
  const path = `/${new BaseController().path}/0a15ce57-c46e-4b71-84f0-49dbed4bb81e/sources-of-information`
  let currentPage: SourcesOfInformation

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()

    cy.visit(path)
    currentPage = Page.verifyOnPage(SourcesOfInformation)
  })

  describe('Authenticated user accesses sources of information', () => {
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
          cy.get('legend').contains('Select the relevant options').should('exist')
        })
    })

    it('should include the primary call to action button', () => {
      currentPage.govukButton().contains('Continue').should('exist')
    })

    it('should move to correct screen upon valid form submission', () => {
      currentPage.completeForm()
      currentPage.govukButton().contains('Continue').click()
      Page.verifyOnPage(CheckReport)
    })

    it('should retain inputted data', () => {
      cy.get('.govuk-checkboxes__input').eq(0).should('have.value', 'interviewInformationSource').should('be.checked')
      cy.get('.govuk-checkboxes__input')
        .eq(1)
        .should('have.value', 'serviceRecordsInformationSource')
        .should('be.checked')
      cy.get('.govuk-checkboxes__input').eq(2).should('have.value', 'cpsSummaryInformationSource').should('be.checked')
      cy.get('.govuk-checkboxes__input')
        .eq(3)
        .should('have.value', 'oasysAssessmentsInformationSource')
        .should('be.checked')
      cy.get('.govuk-checkboxes__input')
        .eq(4)
        .should('have.value', 'previousConvictionsInformationSource')
        .should('be.checked')
      cy.get('.govuk-checkboxes__input')
        .eq(5)
        .should('have.value', 'witnessStatementInformationSource')
        .should('be.checked')
      cy.get('.govuk-checkboxes__input')
        .eq(6)
        .should('have.value', 'childrenServicesInformationSource')
        .should('be.checked')
      cy.get('.govuk-checkboxes__input').eq(7).should('have.value', 'policeInformationSource').should('be.checked')
      cy.get('.govuk-checkboxes__input')
        .eq(8)
        .should('have.value', 'sentencingGuidelinesInformationSource')
        .should('be.checked')
      cy.get('.govuk-checkboxes__input')
        .eq(9)
        .should('have.value', 'domesticAbuseInformationSource')
        .should('be.checked')
      cy.get('.govuk-checkboxes__input').eq(10).should('have.value', 'medicalInformationSource').should('be.checked')
      cy.get('.govuk-checkboxes__input')
        .eq(11)
        .should('have.value', 'equalityInformationFormInformationSource')
        .should('be.checked')
      cy.get('.govuk-checkboxes__input').eq(12).should('have.value', 'otherInformationSource').should('be.checked')

      cy.get('#otherSourceOfInformation').should('have.value', 'Some other information source')
    })
  })
})
