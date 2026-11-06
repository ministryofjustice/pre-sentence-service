import { jwtDecode } from 'jwt-decode'
import type { RequestHandler } from 'express'

import logger from '../../logger'
import asyncMiddleware from './asyncMiddleware'
import { writeReturnToCookie } from '../utils/returnTo'
import { AccessDeniedReason, LogEvent } from '../utils/logging'

export default function authorisationMiddleware(authorisedRoles: string[] = []): RequestHandler {
  return asyncMiddleware((req, res, next) => {
    if (res.locals && res.locals.user && res.locals.user.token) {
      const { authorities: roles = [], auth_source: authSource } = jwtDecode(res.locals.user.token) as {
        authorities?: string[]
        auth_source?: string
      }

      if (authSource !== 'delius' || (authorisedRoles.length && !roles.some(role => authorisedRoles.includes(role)))) {
        logger.warn(
          { event: LogEvent.AccessDenied, reason: AccessDeniedReason.AuthSourceOrRoleNotAllowed },
          'Access denied: user is not signed in through Delius or does not have a required role. User is not authorised to access this service'
        )

        return res.redirect('/authError')
      }

      return next()
    }

    req.session.returnTo = req.originalUrl
    writeReturnToCookie(res, req.originalUrl)
    return res.redirect('/sign-in')
  })
}
