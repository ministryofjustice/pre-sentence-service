import { Request, Response } from 'express'

import ReportService from '../../services/reportService'
import EventService from '../../services/eventService'

export default class ApiController {
  constructor(protected readonly reportService: ReportService = null, protected readonly eventService: EventService) {}

  createReport = async (req: Request, res: Response): Promise<void> => {
    try {
      const reportDefinition = await this.reportService.getDefinitionByType(req.params.reportType)
      const report = await this.reportService.createReport({
        ...req.body,
        reportDefinitionId: reportDefinition.id,
      })
      // @TODO: Refactor this when we integrate the community API to retrieve defendant data
      const fields = reportDefinition.fields.filter(field => field.name === 'crn')
      if (fields && fields.length) {
        await this.reportService.updateFieldValues([
          {
            reportId: report.id,
            fieldId: fields[0].id,
            value: req.body.crn,
            version: 1,
          },
        ])
      }
      await this.eventService.sendReportEvent({
        reportId: report.id,
        entityId: req.body.entityId,
        crn: req.body.crn,
        reportStatus: 'created',
      })
      res.json(report)
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
      const results = await this.reportService.getAllReportsByType(req.params.reportType)
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
