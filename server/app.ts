import express, { Application } from 'express'
import { serve, setup } from 'swagger-ui-express'

import path from 'path'
import createError from 'http-errors'
import swaggerDocument from './controllers/api/swagger.json'
import 'reflect-metadata'

import indexRoutes from './routes'
import nunjucksSetup from './utils/nunjucksSetup'
import errorHandler from './errorHandler'
import apiRouter from './routes/apiRouter'
import standardRouter from './routes/standardRouter'
import type UserService from './services/userService'
import type PreSentenceToDeliusService from './services/preSentenceToDeliusService'
import GotenbergClient from './data/gotenbergClient'
import pdfRenderer from './utils/pdfRenderer'
import config from './config'

import setUpWebSession from './middleware/setUpWebSession'
import setUpStaticResources from './middleware/setUpStaticResources'
import setUpWebSecurity from './middleware/setUpWebSecurity'
import setUpHealthChecks from './middleware/setUpHealthChecks'
import setUpWebRequestParsing from './middleware/setupRequestParsing'

export default function createApplication(
  userService: UserService,
  preSentenceToDeliusService: PreSentenceToDeliusService
): Application {
  const app = express()

  app.set('json spaces', 2)
  app.set('trust proxy', true)
  app.set('port', process.env.PORT || 3000)

  app.use(setUpHealthChecks())
  app.use(setUpWebSecurity())
  app.use(setUpWebSession())
  app.use(setUpWebRequestParsing())
  app.use(setUpStaticResources())
  nunjucksSetup(app, path)
  app.use(pdfRenderer(new GotenbergClient(config.apis.gotenberg.apiUrl)))
  app.use(
    '/api/docs',
    serve,
    setup(swaggerDocument, {
      swaggerOptions: {
        validatorUrl: null,
      },
      explorer: false,
      customCss: 'svg { position: absolute; width: 0; height: 0; }',
    })
  )

  app.use('/api', apiRouter())
  app.use('/', indexRoutes(standardRouter(userService, preSentenceToDeliusService)))

  app.use((req, res, next) => next(createError(404, 'Not found')))
  app.use(errorHandler(process.env.NODE_ENV === 'production'))

  return app
}
