import type { Request, Response, NextFunction } from 'express'
import type { HTTPError } from 'superagent'
import logger from '../logger'
import { LogEvent, classifyError, extractEnvironment } from './utils/logging'

export default function createErrorHandler(production: boolean) {
  return (error: HTTPError, req: Request, res: Response, next: NextFunction): void => {
    const errorType = classifyError(error)
    const environment = extractEnvironment()

    logger.error(
      {
        err: error, // Safe here, typically a custom Error, not an HTTP response
        event: LogEvent.RequestFailed,
        errorType,
        httpMethod: req.method,
        statusCode: error.status || 500,
        environment,
      },
      'Request handling failed'
    )

    if (error.status === 401 || error.status === 403) {
      logger.info(
        {
          event: LogEvent.AccessDenied,
          statusCode: error.status,
          action: 'redirect_to_sign_out',
        },
        'Redirecting to sign-out after a 401 or 403 response'
      )

      return res.redirect('/sign-out')
    }

    res.locals.message = production
      ? 'Something went wrong. The error has been logged. Please try again'
      : error.message
    res.locals.status = error.status
    res.locals.stack = production ? null : error.stack

    res.status(error.status || 500)

    return res.render('pages/error')
  }
}
