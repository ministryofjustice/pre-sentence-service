import { Request, Response } from 'express'

import ReportService from '../../services/reportService'
import EventService from '../../services/eventService'

export default class ApiController {
  constructor(protected readonly reportService: ReportService = null, protected readonly eventService: EventService) {}

  // Support legacy nDelius report types
  private correctReportType(reportType: string): string {
    let correctedReportType: string
    switch (reportType) {
      case 'shortFormatPreSentenceReport':
        correctedReportType = 'short-format'
        break
      case 'oralReport':
        correctedReportType = 'record-of-oral'
        break
      default:
        correctedReportType = ''
    }
    return correctedReportType.length ? correctedReportType : reportType
  }

  createReport = async (req: Request, res: Response): Promise<void> => {
    try {
      const reportType = this.correctReportType(req.params.reportType)
      const reportDefinition = await this.reportService.getDefinitionByType(reportType)
      if (!reportDefinition) {
        res.status(400).send('Unknown Pre-Sentence type')
        return
      }
      const report = await this.reportService.createReport({
        ...req.body,
        reportDefinitionId: reportDefinition.id,
      })
      // @TODO: Refactor this when we integrate the community API to retrieve defendant data
      const crnField = reportDefinition.fields.filter(field => field.name === 'crn')
      if (crnField && crnField.length) {
        await this.reportService.updateFieldValues([
          {
            reportId: report.id,
            fieldId: crnField[0].id,
            value: req.body.crn,
            version: 1,
          },
        ])
      }
      await this.eventService.sendReportEvent({
        reportId: report.id,
        entityId: req.body.entityId,
        crn: req.body.crn,
        reportStatus: 'started',
      })
      res.status(201).json({
        ...report,
        urn: `uk:gov:hmpps:pre-sentence-service:report:${report.id}`,
      })
    } catch (error) {
      res.status(error.status || 500).send(error.message)
    }
  }

  getReportById = async (req: Request, res: Response): Promise<void> => {
    try {
      const report = await this.reportService.getReportById(req.params.id)
      res.json(report)
    } catch (error) {
      res.status(error.status || 500).send(error.message)
    }
  }

  getAllReportsByType = async (req: Request, res: Response): Promise<void> => {
    try {
      const reportType = this.correctReportType(req.params.reportType)
      const results = await this.reportService.getAllReportsByType(reportType)
      res.json({
        request: req.params.reportType,
        found: results && results.length,
        results,
      })
    } catch (error) {
      res.status(error.status || 500).send(error.message)
    }
  }
}
