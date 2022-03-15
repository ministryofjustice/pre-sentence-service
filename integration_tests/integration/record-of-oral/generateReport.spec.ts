context('Generate PDF report', () => {
  const path = '/0a15ce57-c46e-4b71-84f0-49dbed4bb81e/pdf'
  const filePath = `${Cypress.config('screenshotsFolder')}/record-of-oral-${new Date().getTime()}.pdf`

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()
  })

  describe('Authenticated user requests a PDF report', () => {
    it('should generate a PDF report', () => {
      cy.request({ url: path, encoding: 'binary' }).then(response => {
        const expectedFileSize = response.headers['content-length']
        cy.writeFile(filePath, response.body, { encoding: 'binary' })
        cy.exec(`ls -al ${filePath} | awk '{print $5}'`).then(({ stdout: actualFileSize }) => {
          expect(actualFileSize).to.equal(expectedFileSize)
        })
      })
    })
  })
})
