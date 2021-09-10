import { RequestHandler, Router } from 'express'

import asyncMiddleware from '../../middleware/asyncMiddleware'

export default function Index(): Router {
  const router = Router()
  const get = (path: string, handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  router.use((req, res, next) => {
    res.locals.preSentenceType = 'Record of oral pre-sentence report'
    next()
  })

  get('/record-of-oral', (req, res, next) => {
    res.render('record-of-oral/landing')
  })

  return router
}
