import express, { Express } from 'express'
import session from 'express-session'
import path from 'path'
import request from 'supertest'
import config from '../config'
import nunjucksSetup from '../utils/nunjucksSetup'
import sessionTimeoutRoutes from './sessionTimeout'

const authSignOutUrl = `${config.apis.hmppsAuth.externalUrl}/sign-out?client_id=${config.apis.hmppsAuth.apiClientId}&redirect_uri=${config.domain}`

function appWithSessionTimeoutRoutes(): Express {
  const app = express()
  app.set('view engine', 'njk')
  nunjucksSetup(app, path)
  app.use(session({ secret: 'test-secret', resave: false, saveUninitialized: false }))
  app.get('/set-marker', (req, res) => {
    req.session.nowInMinutes = 12345
    res.status(200).end()
  })
  app.get('/get-marker', (req, res) => {
    res.json({
      returnTo: req.session.returnTo || null,
      timedOut: req.session.timedOut || null,
      nowInMinutes: req.session.nowInMinutes || null,
    })
  })
  app.use(sessionTimeoutRoutes())
  app.get('/', (req, res) => {
    res.status(200).send('home')
  })
  return app
}

let app: Express

beforeEach(() => {
  app = appWithSessionTimeoutRoutes()
})

describe('GET /timed-out', () => {
  it('redirects to the auth sign-out with the same redirect_uri as the sign out button', async () => {
    const res = await request(app).get('/timed-out?returnTo=%2Freport%2F123%2Fproposal').expect(302)
    expect(res.headers.location).toBe(authSignOutUrl)
  })

  it('replaces the session and stores the returnTo path with the timed out flag', async () => {
    const agent = request.agent(app)
    await agent.get('/set-marker').expect(200)
    await agent.get('/get-marker').expect({ returnTo: null, timedOut: null, nowInMinutes: 12345 })
    await agent.get('/timed-out?returnTo=%2Freport%2F123%2Fproposal').expect(302)
    await agent.get('/get-marker').expect({ returnTo: '/report/123/proposal', timedOut: true, nowInMinutes: null })
  })

  it('stores the service root when returnTo is unsafe', async () => {
    const agent = request.agent(app)
    await agent.get('/timed-out?returnTo=%2F%2Fevil.example.com').expect(302)
    await agent.get('/get-marker').expect({ returnTo: '/', timedOut: true, nowInMinutes: null })
  })
})

describe('GET / after the auth sign-out round trip', () => {
  it('redirects to the timed out page with the stored returnTo and clears the flag', async () => {
    const agent = request.agent(app)
    await agent.get('/timed-out?returnTo=%2Freport%2F123%2Fproposal').expect(302)
    const res = await agent.get('/').expect(302)
    expect(res.headers.location).toBe('/timed-out?signedOut=true&returnTo=%2Freport%2F123%2Fproposal')
    await agent
      .get('/get-marker')
      .expect({ returnTo: '/report/123/proposal', timedOut: null, nowInMinutes: null })
  })

  it('passes through to the next handler when the session has not timed out', () => {
    return request(app).get('/').expect(200, 'home')
  })
})

describe('GET /timed-out?signedOut=true', () => {
  it('renders the signed out page with the inactivity explanation', () => {
    return request(app)
      .get('/timed-out?signedOut=true')
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('You have been signed out')
        expect(res.text).toContain(
          'You have been signed out due to 2 hours of inactivity. Your work has been saved but you will need to sign back in to resume your report.'
        )
        expect(res.text).toContain('Sign in')
      })
  })

  it('renders the content in a two thirds grid column', () => {
    return request(app)
      .get('/timed-out?signedOut=true')
      .expect(res => {
        expect(res.text).toContain('govuk-grid-column-two-thirds')
      })
  })

  it('links the sign in button to the returnTo path', () => {
    return request(app)
      .get('/timed-out?signedOut=true&returnTo=%2Freport%2F123%2Fproposal')
      .expect(res => {
        expect(res.text).toContain('data-qa="sign-in" href="/report/123/proposal"')
      })
  })

  it('falls back to the service root when returnTo is an absolute URL', () => {
    return request(app)
      .get('/timed-out?signedOut=true&returnTo=https%3A%2F%2Fevil.example.com')
      .expect(res => {
        expect(res.text).not.toContain('evil.example.com')
        expect(res.text).toContain('data-qa="sign-in" href="/"')
      })
  })

  it('falls back to the service root when returnTo is protocol-relative', () => {
    return request(app)
      .get('/timed-out?signedOut=true&returnTo=%2F%2Fevil.example.com')
      .expect(res => {
        expect(res.text).not.toContain('evil.example.com')
        expect(res.text).toContain('data-qa="sign-in" href="/"')
      })
  })

  it('falls back to the service root when returnTo is missing', () => {
    return request(app)
      .get('/timed-out?signedOut=true')
      .expect(res => {
        expect(res.text).toContain('data-qa="sign-in" href="/"')
      })
  })

  it('does not render the timeout warning modal on the timed out page', () => {
    return request(app)
      .get('/timed-out?signedOut=true')
      .expect(res => {
        expect(res.text).not.toContain('data-module="govuk-timeout-warning"')
      })
  })
})
