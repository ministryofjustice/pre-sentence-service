import express, { Express } from 'express'
import session from 'express-session'
import path from 'path'
import request from 'supertest'
import nunjucksSetup from '../utils/nunjucksSetup'
import sessionTimeoutRoutes from './sessionTimeout'

function appWithSessionTimeoutRoutes(): Express {
  const app = express()
  app.set('view engine', 'njk')
  nunjucksSetup(app, path)
  app.use(session({ secret: 'test-secret', resave: false, saveUninitialized: false }))
  app.get('/set-marker', (req, res) => {
    req.session.returnTo = 'marker'
    res.status(200).end()
  })
  app.get('/get-marker', (req, res) => {
    res.json({ marker: req.session.returnTo || null })
  })
  app.use(sessionTimeoutRoutes())
  return app
}

let app: Express

beforeEach(() => {
  app = appWithSessionTimeoutRoutes()
})

describe('GET /timed-out', () => {
  it('renders the signed out page with the inactivity explanation', () => {
    return request(app)
      .get('/timed-out')
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('You have been signed out')
        expect(res.text).toContain(
          'You have been signed out due to 2 hours of inactivity. Your work has been saved but you will need to sign back in to resume your report.'
        )
        expect(res.text).toContain('Sign in')
      })
  })

  it('links the sign in button to a local returnTo path', () => {
    return request(app)
      .get('/timed-out?returnTo=%2Freport%2F123%2Fproposal')
      .expect(res => {
        expect(res.text).toContain('href="/report/123/proposal"')
      })
  })

  it('falls back to the service root when returnTo is an absolute URL', () => {
    return request(app)
      .get('/timed-out?returnTo=https%3A%2F%2Fevil.example.com')
      .expect(res => {
        expect(res.text).not.toContain('evil.example.com')
        expect(res.text).toContain('data-qa="sign-in" href="/"')
      })
  })

  it('falls back to the service root when returnTo is protocol-relative', () => {
    return request(app)
      .get('/timed-out?returnTo=%2F%2Fevil.example.com')
      .expect(res => {
        expect(res.text).not.toContain('evil.example.com')
        expect(res.text).toContain('data-qa="sign-in" href="/"')
      })
  })

  it('falls back to the service root when returnTo is missing', () => {
    return request(app)
      .get('/timed-out')
      .expect(res => {
        expect(res.text).toContain('data-qa="sign-in" href="/"')
      })
  })

  it('does not render the timeout warning modal on the timed out page', () => {
    return request(app)
      .get('/timed-out')
      .expect(res => {
        expect(res.text).not.toContain('data-module="govuk-timeout-warning"')
      })
  })

  it('destroys the session', async () => {
    const agent = request.agent(app)
    await agent.get('/set-marker').expect(200)
    await agent.get('/get-marker').expect({ marker: 'marker' })
    await agent.get('/timed-out').expect(200)
    await agent.get('/get-marker').expect({ marker: null })
  })
})
