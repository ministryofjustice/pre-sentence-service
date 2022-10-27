import express, { Router } from 'express'
import helmet from 'helmet'
import config from '../config'

export default function setUpWebSecurity(): Router {
  const router = express.Router()

  const wproofreaderUrl = `${config.apis.wproofreader.serviceProtocol}://${config.apis.wproofreader.serviceHost}${
    config.apis.wproofreader.servicePort ? `:${config.apis.wproofreader.servicePort}` : ''
  }`

  // Secure code best practice - see:
  // 1. https://expressjs.com/en/advanced/best-practice-security.html,
  // 2. https://www.npmjs.com/package/helmet
  router.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          // Hash allows inline script pulled in from https://github.com/alphagov/govuk-frontend/blob/master/src/govuk/template.njk
          scriptSrc: [
            "'self'",
            'code.jquery.com',
            wproofreaderUrl,
            "'sha256-+6WnXIl4mbFTCARd8N3COQmT3bJJmo32N8q8ZSQAIcU='",
            `'nonce-${config.nonce}'`,
          ],
          styleSrc: [
            "'self'",
            'code.jquery.com',
            wproofreaderUrl,
            "'unsafe-hashes'",
            "'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='",
            "'sha256-GET5u+7RHImm0Z/5kU2WWNrT9fM4h+Ua9GiqmxXB03g='",
            "'sha256-33YGiROm4Pzv0xXIPo82M0Dt2zrdnP4IgbJq1WeAtf8='",
            "'sha256-wqelJ2mlQSV2AJAp/eXsWo0stxhzfxazoE7QqjXnrFs='",
            "'sha256-/jDKvbQ8cdux+c5epDIqkjHbXDaIY8RucT1PmAe8FG4='",
            "'sha256-ezdv1bOGcoOD7FKudKN0Y2Mb763O6qVtM8LT2mtanIU='",
            "'sha256-jLD2pxuZtowRxJaa7Gk5fzhU0HYiWxyCk191dG7ioSw='",
            `'nonce-${config.nonce}'`,
          ],
          connectSrc: ["'self'", wproofreaderUrl],
          fontSrc: ["'self'", wproofreaderUrl],
          imgSrc: ["'self'", 'data:', wproofreaderUrl],
        },
      },
    })
  )
  return router
}
