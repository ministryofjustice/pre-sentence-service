import type { NextFunction, Request, Response, Router } from 'express'
import express from 'express'
import passport from 'passport'
import flash from 'connect-flash'
import config from '../config'
import auth from '../authentication/auth'
import { clearReturnToCookie, readReturnToCookie, safeReturnTo } from '../utils/returnTo'

const router = express.Router()

export function handleSignInCallbackResult(req: Request, res: Response, next: NextFunction) {
  return (err: Error | null, user?: Express.User | false) => {
    if (err) {
      return next(err)
    }

    if (!user) {
      if (req.session.authRetry) {
        delete req.session.authRetry
        return res.redirect('/autherror')
      }
      req.session.authRetry = true
      return res.redirect('/sign-in')
    }

    const returnTo = safeReturnTo(req.session.returnTo || readReturnToCookie(req)?.returnTo)
    return req.logIn(user, loginErr => {
      if (loginErr) {
        return next(loginErr)
      }
      delete req.session.authRetry
      clearReturnToCookie(res)
      return res.redirect(returnTo)
    })
  }
}

export default function setUpAuth(): Router {
  auth.init()

  router.use(passport.initialize())
  router.use(passport.session())
  router.use(flash())

  router.get('/autherror', (req, res) => {
    res.status(401)
    return res.render('autherror')
  })

  router.get('/sign-in', passport.authenticate('oauth2'))

  router.get('/sign-in/callback', (req, res, next) =>
    passport.authenticate('oauth2', handleSignInCallbackResult(req, res, next))(req, res, next)
  )

  const authUrl = config.apis.hmppsAuth.externalUrl
  const authSignOutUrl = `${authUrl}/sign-out?client_id=${config.apis.hmppsAuth.apiClientId}&redirect_uri=${config.domain}`

  router.use('/sign-out', (req, res, next) => {
    if (req.user) {
      req.logout(err => {
        if (err) return next(err)
        return req.session.destroy(() => res.redirect(authSignOutUrl))
      })
    } else res.redirect(authSignOutUrl)
  })

  router.use('/account-details', (req, res) => {
    res.redirect(`${authUrl}/account-details`)
  })

  router.use((req, res, next) => {
    res.locals.user = req.user
    next()
  })

  return router
}
