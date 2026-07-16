import type { NextFunction, Request, RequestHandler, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'

/**
 * Wraps async Express handlers and preserves route param typing through middleware.
 * @typeParam P The Express route params type (defaults to ParamsDictionary).
 * @param fn Handler to wrap.
 * @returns Wrapped handler with the same param typing preserved.
 */

export default function asyncMiddleware<P = ParamsDictionary>(
  fn: RequestHandler<P>
): RequestHandler<P> {
  return (req: Request<P>, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}