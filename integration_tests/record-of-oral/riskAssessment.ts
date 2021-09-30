import Page from '../pages/page'

export default class IndexPage extends Page {
  constructor() {
    super('Risk assessment')
  }

  completeForm(): void {
    cy.get('#likelihoodTool1').type('Some tool name')
    cy.get('#likelihoodLevel1').click()
    cy.get('#likelihoodTool2').type('Some tool name')
    cy.get('#likelihoodLevel2').click()
    cy.get('#likelihoodTool3').type('Some tool name')
    cy.get('#likelihoodLevel3').click()
    cy.get('#likelihoodTool4').type('Some tool name')
    cy.get('#likelihoodLevel4').click()
    cy.get('#likelihoodAssessment').type('Some assessment')
    cy.get('#riskOfSeriousHarm').click()
    cy.get('#roshEvidence').type('Some RoSH evidence')
    cy.get('#previousSupervisionResponse').click()
  }
}
