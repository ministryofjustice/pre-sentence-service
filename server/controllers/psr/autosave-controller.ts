import { Request, Response } from 'express'
import BaseController from './baseController'
import { ReportStatus } from '../../repositories/entities/reportDetails'
import { HttpError } from '../../@types/httpError'

export default class AutosaveController extends BaseController {
  public post = async (req: Request<{ reportId: string }>, res: Response): Promise<void> => {
    try {
      const reportId = req.params.reportId
      const report = await this.reportService.getReportById(reportId)

      if (!report) {
        res.status(404).json({ error: 'Report not found' })
        return
      }

      if (report.status === ReportStatus.NOT_STARTED) {
        await this.reportService.updateReport(reportId, { status: ReportStatus.STARTED })
      } else {
        await this.reportService.updateReport(reportId, {})
      }

      const firstString = (value: string | string[] | undefined): string | undefined =>
        Array.isArray(value) ? value[0] : value

      const bodyPageNameRaw = req.body.pageName as string | string[] | undefined
      const queryPageNameRaw = req.query.pageName as string | string[] | undefined
      const refererRaw = req.headers.referer

      const bodyPageName = firstString(bodyPageNameRaw)
      const queryPageName = firstString(queryPageNameRaw)
      const referer = firstString(refererRaw)

      let pageName = bodyPageName || queryPageName

      if (!pageName && referer) {
        const urlMatch = referer.match(/\/psr\/[^/]+\/([^/?]+)/)
        if (urlMatch) {
          const urlPageName = urlMatch[1]
          if (urlPageName === 'defendant-details' || urlPageName === 'defendant-behaviour') {
            pageName = `psr-${urlPageName}`
          } else {
            pageName = urlPageName
          }
        }
      }

      if (!pageName) {
        pageName = 'default'
      }

      const result = await this.reportService.persistPartialFieldValues(reportId, req.body, pageName)

      res.status(200).json({
        success: true,
        message: 'Report saved successfully',
        ...(result.dropped.length > 0 ? { droppedFields: result.dropped } : {}),
      })
    } catch (e) {
      const error = e as HttpError
      res.status(error.status || 500).json({ error: error.message || 'Failed to save report' })
    }
  }
}
