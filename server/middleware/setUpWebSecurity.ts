import express, { Router } from 'express'
import helmet from 'helmet'
import config from '../config'

export default function setUpWebSecurity(): Router {
  const router = express.Router()

  // Secure code best practice - see:
  // 1. https://expressjs.com/en/advanced/best-practice-security.html,
  // 2. https://www.npmjs.com/package/helmet
  router.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            'code.jquery.com',
            config.apis.wproofreader.apiUrl,
            "'sha256-+6WnXIl4mbFTCARd8N3COQmT3bJJmo32N8q8ZSQAIcU='",
            `'nonce-${config.nonce}'`,
          ],
          styleSrc: [
            "'self'",
            'code.jquery.com',
            config.apis.wproofreader.apiUrl,
            "'unsafe-hashes'",
            "'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='",
            "'sha256-GET5u+7RHImm0Z/5kU2WWNrT9fM4h+Ua9GiqmxXB03g='",
            "'sha256-33YGiROm4Pzv0xXIPo82M0Dt2zrdnP4IgbJq1WeAtf8='",
            "'sha256-wqelJ2mlQSV2AJAp/eXsWo0stxhzfxazoE7QqjXnrFs='",
            `'nonce-${config.nonce}'`,
          ],
          connectSrc: ["'self'", config.apis.wproofreader.apiUrl],
          fontSrc: ["'self'", config.apis.wproofreader.apiUrl],
          imgSrc: ["'self'", 'data:', config.apis.wproofreader.apiUrl],
        },
      },
    })
  )
  return router
}
