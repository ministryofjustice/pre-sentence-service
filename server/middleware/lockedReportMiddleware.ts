import type { Request, Response, NextFunction, RequestHandler } from 'express'
import ReportService from '../services/reportService'
import { ReportStatus } from '../repositories/entities/reportDetails'

const ALLOWED_WHEN_LOCKED = new Set(['publish-report', 'pdf'])

const lastPathSegment = (path: string): string => {
  const trimmed = path.replace(/\/+$/, '')
  const lastSlash = trimmed.lastIndexOf('/')
  return lastSlash === -1 ? trimmed : trimmed.slice(lastSlash + 1)
}

export default function lockedReportMiddleware(reportService: ReportService): RequestHandler<{ reportId: string }> {
  return (req: Request<{ reportId: string }>, res: Response, next: NextFunction): void => {
    const reportId = req.params.reportId
    if (!reportId) {
      next()
      return
    }

    const action = lastPathSegment(req.path)

    reportService
      .getReportByIdIncludingDeleted(reportId)
      .then(report => {
        if (!report) {
          next()
          return
        }

        if (report.isDeleted) {
          res.redirect(`/psr/${reportId}/deleted`)
          return
        }

        if (report.status === ReportStatus.LOCKED) {
          res.redirect(`/psr/${reportId}/locked`)
          return
        }

        res.locals.report = report

        if (ALLOWED_WHEN_LOCKED.has(action)) {
          next()
          return
        }

        if (report.submittedAt) {
          res.redirect(`/psr/${reportId}/publish-report`)
          return
        }

        next()
      })
      .catch(next)
  }
}
