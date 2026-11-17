import express from 'express'
import fs from 'fs'
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

describe('publish-report.njk', () => {
  const source = fs.readFileSync(path.join(__dirname, 'publish-report.njk'), 'utf8')

  let env: nunjucks.Environment

  const render = (data: Record<string, unknown> = {}, featureSmartSurvey = false) =>
    env.render('psr/publish-report.njk', {
      reportId: '123',
      nonce: 'test-nonce',
      featureSmartSurvey,
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

  it('wraps the Smart Survey popup script in featureSmartSurvey conditional', () => {
    expect(source).toContain('{% if featureSmartSurvey %}')

    const insideIf = source.split('{% if featureSmartSurvey %}')[1].split('{% endif %}')[0]
    expect(insideIf).toContain('https://embed.smartsurvey.io/index.js?popupCode=X8XUZ7')
  })

  it('preserves inherited scripts via super() in the additionalScripts block', () => {
    const additionalScripts = source.split('{% block additionalScripts %}')[1].split('{% endblock %}')[0]
    expect(additionalScripts).toContain('{{ super() }}')
  })

  describe('flag off', () => {
    it('renders the existing psr-complete-card, DD/MM/YYYY date, locked sentence, and old heading unchanged', () => {
      const res = render({
        name: 'John Smith',
        crn: 'X123456',
        submittedAt: '2026-10-28T14:02:00Z',
        commonPlatformUrl: 'https://common-platform.example.com',
        digitalCaseSystemUrl: 'https://digital-case-system.example.com',
      })

      expect(res).toContain('psr-complete-card')
      expect(res).toContain('Pre-sentence report completed')
      expect(res).toContain('John Smith')
      expect(res).toContain('CRN: X123456')
      expect(res).toMatch(/\d{2}\/\d{2}\/\d{4}/)
      expect(res).not.toContain('28 October 2026')
      expect(res).toContain('This PSR is now published on NDelius. It is locked and cannot be edited.')
      expect(res).toContain('If you need to upload your report</h2>')
      expect(res).not.toContain('If you need to upload your report to other systems')
      expect(res).not.toContain('govuk-panel govuk-panel--confirmation')
    })
  })

  describe('flag on', () => {
    beforeEach(() => {
      mockConfig.features.unlockedSigning = true
    })

    it('renders a govuk-panel confirmation with title "Pre-sentence report completed", name, CRN, and the date as "28 October 2026"', () => {
      const res = render({
        name: 'John Smith',
        crn: 'X123456',
        submittedAt: '2026-10-28T14:02:00Z',
        commonPlatformUrl: 'https://common-platform.example.com',
        digitalCaseSystemUrl: 'https://digital-case-system.example.com',
      })

      expect(res).toContain('govuk-panel govuk-panel--confirmation')
      expect(res).toContain('Pre-sentence report completed')
      expect(res).toContain('John Smith<br>CRN: X123456<br>28 October 2026')
      expect(res).not.toContain('psr-complete-card')
    })

    it('renders "This PSR is now available on NDelius." below the panel and not the locked sentence', () => {
      const res = render({
        name: 'John Smith',
        crn: 'X123456',
        submittedAt: '2026-10-28T14:02:00Z',
        commonPlatformUrl: 'https://common-platform.example.com',
        digitalCaseSystemUrl: 'https://digital-case-system.example.com',
      })

      const panelEnd = res.indexOf('</div>', res.indexOf('govuk-panel--confirmation'))
      const hintIndex = res.indexOf('This PSR is now available on NDelius.')

      expect(hintIndex).toBeGreaterThan(-1)
      expect(hintIndex).toBeGreaterThan(panelEnd)
      expect(res).not.toContain('This PSR is now published on NDelius. It is locked and cannot be edited.')
    })

    it('renders heading "If you need to upload your report to other systems" and link lines ending with full stops incl. "(opens in new tab)."', () => {
      const res = render({
        name: 'John Smith',
        crn: 'X123456',
        submittedAt: '2026-10-28T14:02:00Z',
        commonPlatformUrl: 'https://common-platform.example.com',
        digitalCaseSystemUrl: 'https://digital-case-system.example.com',
      })

      const textOnly = res.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')

      expect(res).toContain('If you need to upload your report to other systems')
      expect(textOnly).toContain('Go to Common Platform (opens in new tab).')
      expect(textOnly).toContain('Go to Digital Case System (opens in new tab).')
      expect(textOnly).toContain('Download the completed PSR to share with the court.')
    })

    it('escapes HTML in the name and CRN inside the panel body', () => {
      const res = render({
        name: '<script>alert(1)</script> & Co',
        crn: 'X<b>123</b>456',
        submittedAt: '2026-10-28T14:02:00Z',
        commonPlatformUrl: 'https://common-platform.example.com',
        digitalCaseSystemUrl: 'https://digital-case-system.example.com',
      })

      expect(res).toContain('&lt;script&gt;alert(1)&lt;/script&gt; &amp; Co')
      expect(res).not.toContain('<script>alert(1)</script>')
      expect(res).toContain('X&lt;b&gt;123&lt;/b&gt;456')
      expect(res).not.toContain('X<b>123</b>456')
    })
  })
})
