import { RequestHandler, Router } from 'express'

import asyncMiddleware from '../../middleware/asyncMiddleware'

export default function Index(): Router {
  const router = Router()
  const get = (path: string, handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  router.use((req, res, next) => {
    res.locals.preSentenceType = 'Short format pre-sentence report'
    next()
  })

  get('/short-format', (req, res, next) => {
    res.render('short-format/landing')
  })

  return router
}
