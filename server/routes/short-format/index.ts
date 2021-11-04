import { RequestHandler, Router } from 'express'

import asyncMiddleware from '../../middleware/asyncMiddleware'
import LandingPageController from '../../controllers/short-format/landingPageController'
import BaseController from '../../controllers/short-format/baseController'

export default function Index(): Router {
  const router = Router()
  const routePrefix = (path: string) => `/${new BaseController().path}${path}`
  const get = (path: string, handler: RequestHandler) => router.get(routePrefix(path), asyncMiddleware(handler))

  get('', new LandingPageController().get)

  return router
}
