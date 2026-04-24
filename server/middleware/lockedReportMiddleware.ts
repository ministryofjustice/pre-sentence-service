import type { Request, Response, NextFunction, RequestHandler } from 'express'
import ReportService from '../services/reportService'

const ALLOWED_WHEN_LOCKED = new Set(['publish-report', 'pdf'])

const lastPathSegment = (path: string): string => {
  const trimmed = path.replace(/\/+$/, '')
  const lastSlash = trimmed.lastIndexOf('/')
  return lastSlash === -1 ? trimmed : trimmed.slice(lastSlash + 1)
}

export default function lockedReportMiddleware(reportService: ReportService): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { reportId } = req.params
    if (!reportId) {
      next()
      return
    }

    const action = lastPathSegment(req.path)
    if (ALLOWED_WHEN_LOCKED.has(action)) {
      next()
      return
    }

    reportService
      .getReportById(reportId)
      .then(report => {
        if (report?.submittedAt) {
          res.redirect(`/psr/${reportId}/publish-report`)
          return
        }
        next()
      })
      .catch(next)
  }
}
