import express, { Router } from 'express'
import config from '../config'
import formatDuration from '../utils/formatDuration'
import { readReturnToCookie, safeReturnTo, writeReturnToCookie } from '../utils/returnTo'

export default function sessionTimeoutRoutes(): Router {
  const router = express.Router()

  router.get('/', (req, res, next) => {
    const cookie = readReturnToCookie(req)
    if (req.session?.timedOut || cookie?.timedOut) {
      const returnTo = safeReturnTo(req.session?.returnTo || cookie?.returnTo)
      if (req.session) {
        delete req.session.timedOut
      }
      writeReturnToCookie(res, returnTo)
      res.redirect(`/timed-out?signedOut=true&returnTo=${encodeURIComponent(returnTo)}`)
      return
    }
    next()
  })

  router.get('/timed-out', (req, res, next) => {
    res.locals.nonce = config.nonce
    const returnTo = safeReturnTo(req.query.returnTo)

    if (req.query.signedOut === 'true') {
      res.render('timedOut', {
        signInUrl: returnTo,
        inactivityDuration: formatDuration(config.session.expiryMinutes),
      })
      return
    }

    const authSignOutUrl = `${config.apis.hmppsAuth.externalUrl}/sign-out?client_id=${config.apis.hmppsAuth.apiClientId}&redirect_uri=${config.domain}`
    writeReturnToCookie(res, returnTo, { timedOut: true })
    const redirect = () => res.redirect(authSignOutUrl)
    if (req.session) {
      req.session.regenerate(err => {
        if (err) {
          next(err)
          return
        }
        if (req.session) {
          req.session.timedOut = true
          req.session.returnTo = returnTo
        }
        redirect()
      })
    } else {
      redirect()
    }
  })

  return router
}
