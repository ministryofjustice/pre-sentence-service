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

describe('psrPageLayout.njk navigation', () => {
  let env: nunjucks.Environment

  const render = (data: Record<string, unknown>) =>
    env.render('partials/psrPageLayout.njk', {
      reportId: '48d2f71a-ef0f-49c5-a96f-575d1bb85f81',
      reportPath: 'psr',
      currentPage: 'Defendant details',
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

  it('shows sign and lock your report navigation item when reviewSectionsComplete is true', () => {
    const res = render({ reviewSectionsComplete: true })
    expect(res).toContain('href="/psr/48d2f71a-ef0f-49c5-a96f-575d1bb85f81/sign-your-report"')
    expect(res).toContain('Sign and lock your report')
  })

  it('does not show sign and lock navigation item until reviewSectionsComplete is true', () => {
    const res = render({ reviewSectionsComplete: false })
    expect(res).not.toContain('href="/psr/48d2f71a-ef0f-49c5-a96f-575d1bb85f81/sign-your-report"')
    expect(res).not.toContain('Sign and lock your report')
  })
})