import express, { Router, Express } from 'express'
import cookieSession from 'cookie-session'
import createError from 'http-errors'
import path from 'path'

import allRoutes from '../index'
import nunjucksSetup from '../../utils/nunjucksSetup'
import errorHandler from '../../errorHandler'
import standardRouter from '../standardRouter'
import apiRouter from '../apiRouter'
import MockUserService from './mockUserService'
import MockCommunityService from './mockCommunityService'
import MockPreSentenceToDeliusService from './mockPreSentenceToDeliusService'

const user = {
  name: 'john smith',
  firstName: 'john',
  lastName: 'smith',
  username: 'user1',
  displayName: 'John Smith',
}

function appSetup(baseUrl: string, route: Router, production: boolean): Express {
  const app = express()

  app.set('view engine', 'njk')

  nunjucksSetup(app, path)

  app.use((req, res, next) => {
    res.locals = {}
    res.locals.user = user
    next()
  })

  app.use(cookieSession({ keys: [''] }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(baseUrl, route)
  app.use((req, res, next) => next(createError(404, 'Not found')))
  app.use(errorHandler(production))

  return app
}

export function appWithApiRoutes({ production = false }: { production?: boolean }): Express {
  return appSetup('/api', apiRouter(), production)
}

export default function appWithViewRoutes({ production = false }: { production?: boolean }): Express {
  return appSetup(
    '/',
    allRoutes(standardRouter(new MockUserService(), new MockCommunityService(), new MockPreSentenceToDeliusService())),
    production
  )
}
