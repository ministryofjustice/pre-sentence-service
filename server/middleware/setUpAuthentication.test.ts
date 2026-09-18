import express, { Express, NextFunction, Request, Response } from 'express'
import session from 'express-session'
import path from 'path'
import request from 'supertest'
import nunjucksSetup from '../utils/nunjucksSetup'
import setUpAuthentication, { handleSignInCallbackResult } from './setUpAuthentication'

function appWithAuthRoutes(): Express {
  const app = express()
  app.set('view engine', 'njk')
  nunjucksSetup(app, path)
  app.use(session({ secret: 'test-secret', resave: false, saveUninitialized: false }))
  app.use(setUpAuthentication())
  return app
}

describe('GET /autherror', () => {
  it('renders the authorisation error page with a 401', () => {
    return request(appWithAuthRoutes())
      .get('/autherror')
      .expect(401)
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Authorisation Error')
        expect(res.text).toContain('You are not authorised to use this application.')
      })
  })

  it('does not render the timeout warning modal or fallback banner', () => {
    return request(appWithAuthRoutes())
      .get('/autherror')
      .expect(res => {
        expect(res.text).not.toContain('data-module="govuk-timeout-warning"')
        expect(res.text).not.toContain('For your security, we will sign you out')
      })
  })
})

describe('handleSignInCallbackResult', () => {
  let req: Request
  let res: Response
  let next: NextFunction

  beforeEach(() => {
    req = { session: {}, logIn: jest.fn((user, cb) => cb(null)) } as unknown as Request
    res = { redirect: jest.fn() } as unknown as Response
    next = jest.fn()
  })

  it('restarts the sign-in flow when authentication fails and no retry is in progress', () => {
    handleSignInCallbackResult(req, res, next)(null, false)

    expect(req.session.authRetry).toBe(true)
    expect(res.redirect).toHaveBeenCalledWith('/sign-in')
  })

  it('redirects to the authorisation error page when authentication fails a second time', () => {
    req.session.authRetry = true

    handleSignInCallbackResult(req, res, next)(null, false)

    expect(req.session.authRetry).toBeUndefined()
    expect(res.redirect).toHaveBeenCalledWith('/autherror')
  })

  it('logs the user in and redirects to the stored returnTo on success', () => {
    req.session.returnTo = '/report/123/proposal'
    const user = { username: 'a-user' } as Express.User

    handleSignInCallbackResult(req, res, next)(null, user)

    expect(req.logIn).toHaveBeenCalledWith(user, expect.any(Function))
    expect(res.redirect).toHaveBeenCalledWith('/report/123/proposal')
  })

  it('clears any retry flag on successful sign-in', () => {
    req.session.authRetry = true
    const user = { username: 'a-user' } as Express.User

    handleSignInCallbackResult(req, res, next)(null, user)

    expect(req.session.authRetry).toBeUndefined()
    expect(res.redirect).toHaveBeenCalledWith('/')
  })

  it('forwards passport errors to the error handler', () => {
    const error = new Error('token exchange failed')

    handleSignInCallbackResult(req, res, next)(error, false)

    expect(next).toHaveBeenCalledWith(error)
    expect(res.redirect).not.toHaveBeenCalled()
  })
})
