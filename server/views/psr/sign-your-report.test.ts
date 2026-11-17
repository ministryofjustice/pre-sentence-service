import express from 'express'
import nunjucks from 'nunjucks'
import path from 'path'

const mockConfig = {
  nonce: 'test-nonce',
  features: { richTextEditor: true, unlockedSigning: false },
  session: { expiryMinutes: 120, warningMinutes: 2 },
  wproofreader: {
    bundleUrl: 'https://spellcheck.example.com/wscservice/wscbundle/wscbundle.js',
    host: 'spellcheck.example.com',
  },
}

jest.mock('../../config', () => ({
  __esModule: true,
  default: mockConfig,
}))

import nunjucksSetup from '../../utils/nunjucksSetup'

describe('sign-your-report.njk', () => {
  let env: nunjucks.Environment

  const render = (data: Record<string, unknown> = {}) =>
    env.render('psr/sign-your-report.njk', {
      reportId: '123',
      reportPath: 'psr',
      preSentenceType: 'Pre-Sentence Report',
      pageName: 'sign-your-report',
      csrfToken: 'test-token',
      nonce: 'test-nonce',
      formValidation: { errors: {} },
      featureUnlockedSigning: mockConfig.features.unlockedSigning,
      data,
    })

  beforeEach(() => {
    mockConfig.features.unlockedSigning = false
    const app = express()
    const configureSpy = jest.spyOn(nunjucks, 'configure')
    nunjucksSetup(app, path)
    env = configureSpy.mock.results[0].value as nunjucks.Environment
    configureSpy.mockRestore()
  })

  describe('flag off', () => {
    it('renders the current heading, warning text, Submit button and modal exactly', () => {
      const res = render()

      expect(res).toContain('Sign and lock your report')
      expect(res).toContain(
        'Submitting your report will lock the PSR and you will no longer be able to make any further edits.'
      )
      expect(res).toContain('>Submit</button>')
      expect(res).toContain('Are you ready to sign and lock your report?')
      expect(res).toContain('You will not be able to edit your report after submitting.')
      expect(res).toContain('Sign and lock')
      expect(res).not.toContain('Sign and complete')
      expect(res).not.toContain('Are you ready to sign your report?')
    })
  })

  describe('flag on', () => {
    beforeEach(() => {
      mockConfig.features.unlockedSigning = true
    })

    it('renders "Sign your report" as the heading', () => {
      const res = render({ previouslySigned: false })

      expect(res).toContain('Sign your report')
      expect(res).not.toContain('Sign and lock your report')
    })

    it('renders the inset text when previouslySigned is false', () => {
      const res = render({ previouslySigned: false })

      expect(res).toContain(
        'After you sign your report it will be available on NDelius. You&#39;ll be able to reopen, edit and resign the report until it is locked in NDelius.'
      )
    })

    it('renders the warning replacement text when previouslySigned is true', () => {
      const res = render({ previouslySigned: true })

      expect(res).toContain(
        'A previous version of this report has been signed and made available on NDelius. Signing your report will replace that version on NDelius.'
      )
    })

    it('renders the "Sign and complete" button', () => {
      const res = render({ previouslySigned: false })

      expect(res).toContain('>Sign and complete</button>')
      expect(res).not.toContain('>Submit</button>')
    })

    it('renders the "Are you ready to sign your report?" modal heading and "Sign" confirm button', () => {
      const res = render({ previouslySigned: false })

      expect(res).toContain('Are you ready to sign your report?')
      expect(res).not.toContain('Are you ready to sign and lock your report?')

      const confirmButton = res.match(/id="confirm-submit"[^>]*>([\s\S]*?)<\/button>/)
      expect(confirmButton?.[1].trim()).toBe('Sign')
    })

    it('renders a modal body that does not promise non-editability', () => {
      const res = render({ previouslySigned: false })

      expect(res).toContain(
        'Your report will be available on NDelius. You can reopen and edit it until it is locked in NDelius.'
      )
      expect(res).not.toContain('You will not be able to edit your report after submitting.')
    })

    it('renders a close (X) button inside the modal, still keeping cancel-submit', () => {
      const res = render({ previouslySigned: false })

      expect(res).toContain('id="close-modal"')
      expect(res).toContain('id="cancel-submit"')
    })
  })
})
