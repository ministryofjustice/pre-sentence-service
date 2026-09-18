import express, { Router } from 'express'
import helmet from 'helmet'
import config from '../config'

export default function setUpWebSecurity(): Router {
  const router = express.Router()

  const wpEnabled = config.features.richTextEditor && !!config.wproofreader.host
  const wpSources = wpEnabled ? [config.wproofreader.host] : []
  const wpWebsocket = wpEnabled ? [`wss://${config.wproofreader.host}`] : []

  const ssSources = config.features.smartSurvey
    ? ['embed.smartsurvey.io', '*.smartsurvey.io', '*.smartsurvey.co.uk']
    : []
  const ssStyleHashes = config.features.smartSurvey ? ["'sha256-fPBTCSndKQxWSUpU6A4z70gy4rG8mdMa52QT9ig6z5g='"] : []
  const ssStyleSources = config.features.smartSurvey ? ['fonts.googleapis.com'] : []
  const ssFontSources = config.features.smartSurvey ? ['fonts.gstatic.com'] : []

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
            ...wpSources,
            ...ssSources,
            "'sha256-+6WnXIl4mbFTCARd8N3COQmT3bJJmo32N8q8ZSQAIcU='",
            `'nonce-${config.nonce}'`,
          ],
          styleSrc: [
            "'self'",
            'code.jquery.com',
            ...wpSources,
            ...ssSources,
            ...ssStyleSources,
            "'unsafe-hashes'",
            "'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='",
            "'sha256-GET5u+7RHImm0Z/5kU2WWNrT9fM4h+Ua9GiqmxXB03g='",
            "'sha256-33YGiROm4Pzv0xXIPo82M0Dt2zrdnP4IgbJq1WeAtf8='",
            "'sha256-wqelJ2mlQSV2AJAp/eXsWo0stxhzfxazoE7QqjXnrFs='",
            "'sha256-/jDKvbQ8cdux+c5epDIqkjHbXDaIY8RucT1PmAe8FG4='",
            "'sha256-ezdv1bOGcoOD7FKudKN0Y2Mb763O6qVtM8LT2mtanIU='",
            "'sha256-jLD2pxuZtowRxJaa7Gk5fzhU0HYiWxyCk191dG7ioSw='",
            ...ssStyleHashes,
            `'nonce-${config.nonce}'`,
          ],
          connectSrc: ["'self'", ...wpSources, ...wpWebsocket, ...ssSources],
          fontSrc: ["'self'", ...wpSources, ...ssSources, ...ssFontSources],
          imgSrc: ["'self'", 'data:', ...wpSources, ...ssSources],
          frameSrc: ["'self'", ...ssSources],
        },
      },
    })
  )
  return router
}
