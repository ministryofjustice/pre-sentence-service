import express from 'express'
import fs from 'fs'
import nunjucks from 'nunjucks'
import path from 'path'

const mockConfig = {
  features: { unlockedSigning: false },
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

describe('reports/psr.njk completed timestamp', () => {
  let env: nunjucks.Environment

  const baseData = {
    name: 'Test Defendant',
    dateOfBirth: new Date(1990, 0, 15),
    ageInYears: 36,
    address: {
      buildingName: '',
      addressNumber: '1',
      streetName: 'Test Street',
      town: 'Testtown',
      district: 'Testshire',
      county: 'Testland',
      postcode: 'TE1 1ST',
    },
    offenceData: {
      mainOffence: { subCategory: { description: 'Test main offence' }, date: '01/01/2026' },
      additionalOffences: [],
    },
    sourcesOfInformationList: { predefined: [], custom: [] },
  }

  const render = (data: Record<string, unknown>) =>
    env.render('reports/psr.njk', {
      preSentenceUrl: 'https://example.com',
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

    const rootLoader = new nunjucks.FileSystemLoader(path.join(__dirname, '../../..')) as nunjucks.FileSystemLoader & {
      cache: Record<string, unknown>
    }
    rootLoader.cache = {}
    ;(env as unknown as { loaders: nunjucks.Loader[] }).loaders.push(rootLoader)
  })

  it('includes "Date and time completed: 28 October 2026 at 14:02" when flag on and reportSubmittedAt set', () => {
    mockConfig.features.unlockedSigning = true

    const res = render({ ...baseData, reportSubmittedAt: '2026-10-28T14:02:00Z' })

    expect(res).toContain('Date and time completed:')
    expect(res).toContain('28 October 2026 at 14:02')
  })

  it('includes the case reference number when provided', () => {
    const res = render({ ...baseData, crn: 'X123456' })

    expect(res).toContain('Case reference number (CRN): </strong>X123456')
  })

  it('omits the heading when reportSubmittedAt is null (reopened/unsigned) even if the flag is on', () => {
    mockConfig.features.unlockedSigning = true

    const res = render({ ...baseData, reportSubmittedAt: null })

    expect(res).not.toContain('Date and time completed:')
  })

  it('omits the heading when the flag is off, even if reportSubmittedAt is set', () => {
    mockConfig.features.unlockedSigning = false

    const res = render({ ...baseData, reportSubmittedAt: '2026-10-28T14:02:00Z' })

    expect(res).not.toContain('Date and time completed:')
  })

  it('renders byte-for-byte identical output flag-off whether or not reportSubmittedAt is set', () => {
    mockConfig.features.unlockedSigning = false

    const withSubmittedAt = render({ ...baseData, reportSubmittedAt: '2026-10-28T14:02:00Z' })
    const withoutSubmittedAt = render({ ...baseData, reportSubmittedAt: null })

    expect(withSubmittedAt).not.toContain('Date and time completed:')
    expect(withoutSubmittedAt).not.toContain('Date and time completed:')
  })

  it('renders byte-for-byte identical flag-off output to the template without the completed-timestamp block', () => {
    const source = fs.readFileSync(path.join(__dirname, 'psr.njk'), 'utf8')
    const baselineSource = source.replace(
      /\n\s*\{%- if featureUnlockedSigning and data\.reportSubmittedAt %\}[\s\S]*?\{%- endif %\}/,
      ''
    )
    expect(baselineSource).not.toBe(source)
    expect(baselineSource).not.toContain('Date and time completed:')

    const renderSource = (src: string, data: Record<string, unknown>) =>
      new nunjucks.Template(src, env, path.join(__dirname, 'psr.njk'), true).render({
        preSentenceUrl: 'https://example.com',
        featureUnlockedSigning: mockConfig.features.unlockedSigning,
        data,
      })

    mockConfig.features.unlockedSigning = false
    const data = { ...baseData, reportSubmittedAt: '2026-10-28T14:02:00Z' }

    expect(renderSource(source, data)).toBe(renderSource(baselineSource, data))
    expect(renderSource(source, { ...baseData, reportSubmittedAt: null })).toBe(
      renderSource(baselineSource, { ...baseData, reportSubmittedAt: null })
    )
  })
})
