import fs from 'fs'
import path from 'path'
import express from 'express'
import nunjucks from 'nunjucks'

jest.mock('../../config', () => ({
  __esModule: true,
  default: {
    nonce: 'test-nonce',
    features: { richTextEditor: true },
    session: { expiryMinutes: 120, warningMinutes: 2 },
    wproofreader: {
      bundleUrl: 'https://spellcheck.example.com/wscservice/wscbundle/wscbundle.js',
      host: 'spellcheck.example.com',
    },
  },
}))

import nunjucksSetup from '../../utils/nunjucksSetup'

const psrViewsDir = path.join(__dirname, '../psr')

const applicableTemplates = [
  'offence-analysis.njk',
  'psr-defendant-behaviour.njk',
  'risk-analysis.njk',
  'sentencing-proposal.njk',
  'sign-your-report.njk',
  'sources-of-information.njk',
]

const excludedTemplates = ['psr-defendant-details.njk', 'preview-report.njk']

describe('autosaveStatus.njk partial', () => {
  let env: nunjucks.Environment

  beforeEach(() => {
    const app = express()
    const configureSpy = jest.spyOn(nunjucks, 'configure')
    nunjucksSetup(app, path)
    env = configureSpy.mock.results[0].value as nunjucks.Environment
    configureSpy.mockRestore()
  })

  it('renders the last saved time from data.lastUpdatedBy in 24-hour format', () => {
    const out = env.render('partials/autosaveStatus.njk', {
      data: { lastUpdatedBy: new Date('2026-01-15T14:01:00Z') },
    })
    expect(out).toContain('This page was last saved at')
    expect(out).toContain('14:01')
  })

  it('renders a hidden focusable red connection error banner', () => {
    const out = env.render('partials/autosaveStatus.njk', {
      data: { lastUpdatedBy: new Date('2026-01-15T14:01:00Z') },
    })
    expect(out).toContain('data-connection-error')
    expect(out).toContain('There is a problem with the connection.')
    expect(out).toContain('Your changes will be saved when it is restored.')
    expect(out).toContain('tabindex="-1"')
    expect(out).toContain('role="alert"')
    expect(out).toContain('hidden')
  })

  it('renders a hidden green connection restored banner', () => {
    const out = env.render('partials/autosaveStatus.njk', {
      data: { lastUpdatedBy: new Date('2026-01-15T14:01:00Z') },
    })
    expect(out).toContain('data-connection-restored')
    expect(out).toContain('The connection has been restored.')
  })
})

describe('autosave status template inclusion', () => {
  it.each(applicableTemplates)('%s includes the autosave status partial', template => {
    const source = fs.readFileSync(path.join(psrViewsDir, template), 'utf8')
    expect(source).toContain('partials/autosaveStatus.njk')
  })

  it.each(excludedTemplates)('%s does not include the autosave status partial', template => {
    const source = fs.readFileSync(path.join(psrViewsDir, template), 'utf8')
    expect(source).not.toContain('autosaveStatus')
  })
})
