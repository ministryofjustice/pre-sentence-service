import { RequestHandler } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { passportJwtSecret } from 'jwks-rsa'

import passport from 'passport'

import config from '../config'
import logger from '../../logger'

export type ApiAuthenticationMiddleware = () => RequestHandler

const apiAuthenticationMiddleware: ApiAuthenticationMiddleware = () => passport.authenticate('jwt', { session: false })

function initAuth(): void {
  const opts = {
    secretOrKeyProvider: passportJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${config.apis.hmppsAuth.url}/.well-known/jwks.json`,
    }),
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    issuer: `${config.apis.hmppsAuth.url}/issuer`,
    algorithms: ['RS256'],
  }
  const strategy = new Strategy(opts, (jwtPayload, done) => {
    logger.info('JWT Payload:', jwtPayload)
    done(null, false)
  })
  passport.use(strategy)
}

export { apiAuthenticationMiddleware, initAuth }
