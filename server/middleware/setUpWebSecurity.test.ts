import express from 'express'
import request from 'supertest'

jest.mock('../config', () => ({
  __esModule: true,
  default: {
    nonce: 'test-nonce',
    features: { richTextEditor: true },
    wproofreader: {
      licenceKey: 'k',
      bundleUrl: 'https://svc.webspellchecker.net/bundle.js',
      host: 'svc.webspellchecker.net',
    },
  },
}))

import config from '../config'
import setUpWebSecurity from './setUpWebSecurity'

describe('setUpWebSecurity CSP gating', () => {
  const buildApp = () => {
    const app = express()
    app.use(setUpWebSecurity())
    app.get('/', (_req, res) => {
      res.send('ok')
    })
    return app
  }

  afterEach(() => {
    // restore defaults between tests
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.richTextEditor = true
  })

  it('includes the WProofreader host in CSP when the flag is ON', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.richTextEditor = true
    const res = await request(buildApp()).get('/')
    const csp = res.headers['content-security-policy'] || ''
    expect(csp).toContain('svc.webspellchecker.net')
    expect(csp).toContain('wss://svc.webspellchecker.net')
  })

  it('omits the WProofreader host from CSP when the flag is OFF', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.richTextEditor = false
    const res = await request(buildApp()).get('/')
    const csp = res.headers['content-security-policy'] || ''
    expect(csp).not.toContain('svc.webspellchecker.net')
    expect(csp).not.toContain('wss://')
  })
})
