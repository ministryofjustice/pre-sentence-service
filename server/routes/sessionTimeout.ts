import express, { Router } from 'express'
import config from '../config'
import formatDuration from '../utils/formatDuration'

function safeReturnTo(returnTo: unknown): string {
  if (
    typeof returnTo === 'string' &&
    returnTo.startsWith('/') &&
    !returnTo.startsWith('//') &&
    !returnTo.includes('\\')
  ) {
    return returnTo
  }
  return '/'
}

export default function sessionTimeoutRoutes(): Router {
  const router = express.Router()

  router.get('/', (req, res, next) => {
    if (req.session?.timedOut) {
      const returnTo = safeReturnTo(req.session.returnTo)
      delete req.session.timedOut
      res.redirect(`/timed-out?signedOut=true&returnTo=${encodeURIComponent(returnTo)}`)
      return
    }
    next()
  })

  router.get('/timed-out', (req, res) => {
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
    const redirect = () => res.redirect(authSignOutUrl)
    if (req.session) {
      req.session.regenerate(() => {
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
