import { RequestHandler } from 'express'
import logger from '../../logger'
import { LogEvent, classifyError } from '../utils/logging'
import UserService from '../services/userService'
import { ensureError } from '../utils/errorHandling'

export default function populateCurrentUser(userService: UserService): RequestHandler {
  return async (req, res, next) => {
    try {
      if (res.locals.user) {
        let user
        if (req.session.userDetails) {
          user = req.session.userDetails
        } else {
          user = res.locals.user && (await userService.getUser(res.locals.user.token))
          req.session.userDetails = user
        }
        if (user) {
          res.locals.user = { ...user, ...res.locals.user }
        } else {
          logger.info('No user available')
        }
      }
      next()
    } catch (error) {
      const err = ensureError(error)

      logger.warn(
        {
          event: LogEvent.RequestFailed,
          errorName: err.name,
          errorType: classifyError(err),
          statusCode: err.status,
        },
        'Failed to retrieve user details'
      )

      next(err)
    }
  }
}
