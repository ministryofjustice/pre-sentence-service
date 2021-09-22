import { RequestHandler, Router } from 'express'

import asyncMiddleware from '../../middleware/asyncMiddleware'

export default function Index(): Router {
  const router = Router()
  const get = (path: string, handler: RequestHandler) => router.get(path, asyncMiddleware(handler))
  const templateValues = {
    preSentenceType: 'Short Format Pre-Sentence Report',
    timestamp: '', // @TODO: When integration with NDelius set timestamp as e.g. '1 hour ago'
  }

  get('/short-format', (req, res, next) => {
    res.render('short-format/landing', templateValues)
  })

  return router
}
