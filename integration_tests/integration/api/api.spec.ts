context('API v1', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()
  })

  describe('Record of Oral Pre-sentence Report', () => {
    let reportId

    it('creates a new report', () => {
      cy.request('POST', '/api/v1/report/record-of-oral').as('request')
      cy.get('@request').then(response => {
        expect(response.status).to.eq(200)
        assert.isObject(response.body, 'Response is Object')
        cy.wrap(response.body.raw[0]).should('include', {
          status: 'NOT_STARTED',
        })
        reportId = response.body.raw[0].id
      })
    })

    it('returns the created report', () => {
      cy.request('GET', `/api/v1/report/${reportId}`).as('request')
      cy.get('@request').then(response => {
        expect(response.status).to.eq(200)
        assert.isObject(response.body, 'Response is Object')
        cy.wrap(response.body).should('include', {
          status: 'NOT_STARTED',
        })
      })
    })

    it('should access to the created report in the UI', () => {
      cy.visit(`/record-of-oral/${reportId}`).as('request')
      cy.get('h1').contains('Record of Oral Pre-Sentence Report')
    })
  })

  describe('Short Format Pre-sentence Report', () => {
    let reportId

    it('creates a new report', () => {
      cy.request('POST', '/api/v1/report/short-format').as('request')
      cy.get('@request').then(response => {
        expect(response.status).to.eq(200)
        assert.isObject(response.body, 'Response is Object')
        cy.wrap(response.body.raw[0]).should('include', {
          status: 'NOT_STARTED',
        })
        reportId = response.body.raw[0].id
      })
    })

    it('returns the created report', () => {
      cy.request('GET', `/api/v1/report/${reportId}`).as('request')
      cy.get('@request').then(response => {
        expect(response.status).to.eq(200)
        assert.isObject(response.body, 'Response is Object')
        cy.wrap(response.body).should('include', {
          status: 'NOT_STARTED',
        })
      })
    })

    it('should access to the created report in the UI', () => {
      cy.visit(`/short-format/${reportId}`).as('request')
      cy.get('h1').contains('Short Format Pre-Sentence Report')
    })
  })
})
