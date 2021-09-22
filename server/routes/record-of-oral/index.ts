import { RequestHandler, Router } from 'express'

import asyncMiddleware from '../../middleware/asyncMiddleware'

export default function Index(): Router {
  const router = Router()
  const get = (path: string, handler: RequestHandler) => router.get(path, asyncMiddleware(handler))
  const templateValues = {
    preSentenceType: 'Record of Oral Pre-Sentence Report',
    timestamp: '', // @TODO: When integration with NDelius set timestamp as e.g. '1 hour ago'
  }

  get('/record-of-oral', (req, res, next) => {
    res.render('record-of-oral/landing', templateValues)
  })

  return router
}
