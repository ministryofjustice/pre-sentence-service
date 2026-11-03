import express from 'express'
import nunjucks from 'nunjucks'
import path from 'path'

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

const baseContext = {
  reportId: '123',
  reportPath: 'psr',
  preSentenceType: 'Pre-Sentence Report',
  pageName: 'offence-analysis',
  csrfToken: 'test-token',
  nonce: 'test-nonce',
  formValidation: { errors: {} },
}

describe('offence analysis and edit offences views', () => {
  let env: nunjucks.Environment

  beforeAll(() => {
    const app = express()
    const configureSpy = jest.spyOn(nunjucks, 'configure')
    nunjucksSetup(app, path)
    env = configureSpy.mock.results[0].value as nunjucks.Environment
    configureSpy.mockRestore()
  })

  const renderOffenceAnalysis = (offences: { mainOffence: string; additionalOffences: string[] } | null) =>
    env.render('psr/offence-analysis.njk', {
      ...baseContext,
      data: {
        offences,
        offencesAvailable: Boolean(offences),
        offencesUnderConsideration: '',
        offencesPattern: '',
        reviewSectionsComplete: false,
        sectionStatuses: {},
      },
    })

  it('shows the review offences card with an edit offences link', () => {
    const html = renderOffenceAnalysis({
      mainOffence: 'Allowing a chimney to be on fire - 17/05/2026',
      additionalOffences: ['Driving after consuming alcohol or taking drugs - 08/09/2026'],
    })

    expect(html).toContain('Review offences')
    expect(html).not.toContain('Review offences from NDelius')
    expect(html).toContain('Offence details')
    expect(html).toContain('/psr/123/edit-offences')
    expect(html).toContain('Edit offences')
    expect(html).toContain('Allowing a chimney to be on fire - 17/05/2026')
    expect(html).toContain('Driving after consuming alcohol or taking drugs - 08/09/2026')
    expect(html).not.toContain('No additional offences')
  })

  it('shows "No additional offences" when there are none', () => {
    const html = renderOffenceAnalysis({ mainOffence: 'Main - 01/01/2026', additionalOffences: [] })

    expect(html).toContain('No additional offences')
  })

  it('renders the edit offences form without autosave', () => {
    const html = env.render('psr/edit-offences.njk', {
      ...baseContext,
      pageName: 'edit-offences',
      data: {
        mainOffence: 'Main - 01/01/2026',
        additionalOffences: 'A - 02/01/2026\nB - 03/01/2026',
        reviewSectionsComplete: false,
        sectionStatuses: {},
      },
    })

    expect(html).toContain('Edit offences')
    expect(html).toContain('Any edits you make to offences in this PSR will not be shown in NDelius.')
    expect(html).not.toContain('data-autosave')
    expect(html).toContain('Main offence')
    expect(html).toContain('Additional offences (if applicable)')
    expect(html).toContain('Save and continue')
    expect(html).toContain('/psr/123/offence-analysis')
  })

  it('shows the main offence validation error inline and in the summary', () => {
    const html = env.render('psr/edit-offences.njk', {
      ...baseContext,
      pageName: 'edit-offences',
      formValidation: { isValid: false, errors: { mainOffence: 'You must include a main offence' } },
      data: { mainOffence: '', additionalOffences: '', reviewSectionsComplete: false, sectionStatuses: {} },
    })

    expect(html).toContain('There is a problem')
    expect(html).toContain('#mainOffence')
    expect(html.match(/You must include a main offence/g)!.length).toBeGreaterThanOrEqual(2)
  })
})
