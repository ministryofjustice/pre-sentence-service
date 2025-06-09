import { RequestHandler } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { Algorithm } from 'jsonwebtoken'
import { passportJwtSecret } from 'jwks-rsa'

import passport from 'passport'

import config from '../config'

export type ApiAuthenticationMiddleware = () => RequestHandler

const apiAuthenticationMiddleware: ApiAuthenticationMiddleware = () => passport.authenticate('jwt', { session: false })

function initAuth(): void {
  const algorithms: Algorithm[] = ['RS256']
  const opts = {
    secretOrKeyProvider: passportJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${config.apis.hmppsAuth.url}/.well-known/jwks.json`,
    }),
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    issuer: `${config.apis.hmppsAuth.url}/issuer`,
    algorithms,
  }

  const jwtStrategy = new Strategy(opts, (jwtPayload, done) => done(null, jwtPayload))
  passport.use(jwtStrategy)
}

export { apiAuthenticationMiddleware, initAuth }
