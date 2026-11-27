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

describe('offence-analysis.njk', () => {
  let env: nunjucks.Environment

  const render = (data: Record<string, unknown> = {}) =>
    env.render('psr/offence-analysis.njk', {
      reportId: '123',
      reportPath: 'psr',
      preSentenceType: 'Pre-Sentence Report',
      pageName: 'offence-analysis',
      csrfToken: 'test-token',
      nonce: 'test-nonce',
      formValidation: { errors: {} },
      data,
    })

  beforeEach(() => {
    const app = express()
    const configureSpy = jest.spyOn(nunjucks, 'configure')
    nunjucksSetup(app, path)
    env = configureSpy.mock.results[0].value as nunjucks.Environment
    configureSpy.mockRestore()
  })

  it('renders the "Review offences" heading and not the old NDelius heading', () => {
    const res = render({ offencesAvailable: true, offencesData: { mainOffence: { description: 'Theft' } } })

    expect(res).toContain('Review offences')
    expect(res).not.toContain('Review offences from NDelius')
  })

  it('renders the new guidance paragraph and not the old NDelius copy', () => {
    const res = render({ offencesAvailable: true, offencesData: { mainOffence: { description: 'Theft' } } })

    expect(res).toContain(
      'You can edit offences in this PSR, but your changes will not be shown in nDelius. Any further changes to offences in nDelius will not be shown in this report.'
    )
    expect(res).not.toContain('go to NDelius to update it')
  })

  it('renders the "Offence details" summary card with an "Edit offences" link to the edit-offences page', () => {
    const res = render({ offencesAvailable: true, offencesData: { mainOffence: { description: 'Theft' } } })

    expect(res).toContain('Offence details')
    expect(res).toContain('Edit offences')
    expect(res).toContain('href="/psr/123/edit-offences"')
  })

  it('does not render the old table headers', () => {
    const res = render({ offencesAvailable: true, offencesData: { mainOffence: { description: 'Theft' } } })

    expect(res).not.toContain('>Offence<')
    expect(res).not.toContain('>Date of offence<')
  })

  it('renders the main offence and each additional offence description, in input order', () => {
    const res = render({
      offencesAvailable: true,
      offencesData: {
        mainOffence: { description: 'Burglary', date: '01/01/2024' },
        additionalOffences: [{ description: 'Theft', date: '02/01/2024' }, { description: 'Criminal damage' }],
      },
    })

    const burglaryIndex = res.indexOf('Burglary')
    const theftIndex = res.indexOf('Theft')
    const damageIndex = res.indexOf('Criminal damage')

    expect(burglaryIndex).toBeGreaterThan(-1)
    expect(theftIndex).toBeGreaterThan(burglaryIndex)
    expect(damageIndex).toBeGreaterThan(theftIndex)
  })

  it('renders "No additional offences" when there are no additional offences', () => {
    const res = render({
      offencesAvailable: true,
      offencesData: {
        mainOffence: { description: 'Burglary' },
        additionalOffences: [],
      },
    })

    expect(res).toContain('No additional offences')
  })

  it('escapes offence descriptions', () => {
    const res = render({
      offencesAvailable: true,
      offencesData: {
        mainOffence: { description: '<script>bad()</script>' },
        additionalOffences: [],
      },
    })

    expect(res).not.toContain('<script>bad()</script>')
    expect(res).toContain('&lt;script&gt;')
  })

  it('renders the fetch-failure warning when offences are not available', () => {
    const res = render({ offencesAvailable: false, offencesData: null })

    expect(res).toContain(
      'Unable to fetch offence details from NDelius. Please refresh the page or check NDelius directly.'
    )
  })

  it('does not render the fetch-failure warning when offences are available', () => {
    const res = render({ offencesAvailable: true, offencesData: { mainOffence: { description: 'Theft' } } })

    expect(res).not.toContain('Unable to fetch offence details from NDelius')
  })

  it('appends the new guidance sentence to the offencesPattern hint', () => {
    const res = render({ offencesAvailable: true, offencesData: { mainOffence: { description: 'Theft' } } })

    expect(res).toContain(
      'If there is no previous offending behaviour or response to supervision, briefly explain why this does not apply.'
    )
  })
})
