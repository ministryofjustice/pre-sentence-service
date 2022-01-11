import { getRepository } from 'typeorm'

import Report from '../repositories/entities/report'
import ReportDefinition from '../repositories/entities/reportDefinition'

export interface IReport {
  id?: string
  reportDefinitionId: number
}

export default class ReportService {
  public async createReport(report: IReport): Promise<Report> {
    const reportRepository = getRepository(Report)
    const result = await reportRepository.create(report)
    return reportRepository.save(result)
  }

  public getReportById(id: string): Promise<Report> {
    return getRepository(Report).findOne({
      where: {
        id,
      },
      relations: ['reportDefinition', 'reportDefinition.fields'],
    })
  }

  public getAllReportsByType(type: string): Promise<Report[]> {
    return getRepository(Report).find({
      where: {
        reportDefinition: {
          type,
        },
      },
      relations: ['reportDefinition'],
    })
  }

  public getDefinitionByType(type: string): Promise<ReportDefinition> {
    return getRepository(ReportDefinition).findOne({
      select: ['id'],
      where: {
        type,
      },
    })
  }
}
