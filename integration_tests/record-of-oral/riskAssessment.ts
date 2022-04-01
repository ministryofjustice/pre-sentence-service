import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Risk assessment')
  }

  completeForm(): void {
    cy.get('#assessmentTool1').clear().type('Some tool name')
    cy.get('#assessmentLevel1').click()
    cy.get('#assessmentTool2').clear().type('Some tool name')
    cy.get('#assessmentLevel2').click()
    cy.get('#assessmentTool3').clear().type('Some tool name')
    cy.get('#assessmentLevel3').click()
    cy.get('#assessmentTool4').clear().type('Some tool name')
    cy.get('#assessmentLevel4').click()
    cy.get('#yourAssessment').clear().type('Some assessment')
    cy.get('#riskOfSeriousHarm').click()
    cy.get('#evidenceForRiskLevel').clear().type('Some RoSH evidence')
    cy.get('#responseToPreviousSupervision').click()
  }

  clearForm(): void {
    cy.get('#assessmentTool1').clear()
    cy.get('#assessmentLevel1').invoke('removeAttr', 'checked')
    cy.get('#assessmentTool2').clear()
    cy.get('#assessmentLevel2').invoke('removeAttr', 'checked')
    cy.get('#assessmentTool3').clear()
    cy.get('#assessmentLevel3').invoke('removeAttr', 'checked')
    cy.get('#assessmentTool4').clear()
    cy.get('#assessmentLevel4').invoke('removeAttr', 'checked')
    cy.get('#yourAssessment').clear()
    cy.get('#evidenceForRiskLevel').clear()
    cy.get('#riskOfSeriousHarm').invoke('removeAttr', 'checked')
    cy.get('#responseToPreviousSupervision').invoke('removeAttr', 'checked')
  }
}
