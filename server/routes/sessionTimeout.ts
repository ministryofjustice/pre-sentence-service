import express, { Router } from 'express'
import config from '../config'
import formatDuration from '../utils/formatDuration'

function safeReturnTo(returnTo: unknown): string {
  if (typeof returnTo === 'string' && returnTo.startsWith('/') && !returnTo.startsWith('//')) {
    return returnTo
  }
  return '/'
}

export default function sessionTimeoutRoutes(): Router {
  const router = express.Router()

  router.get('/timed-out', (req, res) => {
    res.locals.nonce = config.nonce
    const render = () =>
      res.render('timedOut', {
        signInUrl: safeReturnTo(req.query.returnTo),
        inactivityDuration: formatDuration(config.session.expiryMinutes),
      })
    if (req.session) {
      req.session.destroy(() => render())
    } else {
      render()
    }
  })

  return router
}
