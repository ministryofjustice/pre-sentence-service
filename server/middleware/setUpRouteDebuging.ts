import logger from '../../logger'
import type { NextFunction, Request, Response } from 'express'

export default function setUpRouteDebugging(req: Request, res: Response, next: NextFunction): void {
  logger.debug('debugging routing', { originalUrl: req.originalUrl, req })
  // ...
  // connect to pod, get logs on the pod – .
  // kubectl get pods -n court-probation-dev
  // Kubectl logs pre-sentence-service-5976f9bdd8-8f4lq -n court-probation-dev
  // ...
  return next()
}
