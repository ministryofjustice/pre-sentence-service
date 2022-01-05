import { Connection, getConnection, InsertResult } from 'typeorm'

import Report from '../repositories/entities/report'
import ReportDefinition from '../repositories/entities/reportDefinition'

export default class ReportService {
  constructor(private databaseConnection: Connection = null) {}

  public createReport(reportDefinitionId: number): Promise<InsertResult> {
    return getConnection().createQueryBuilder().insert().into(Report).values({ reportDefinitionId }).execute()
  }

  public getReportById(id: string): Promise<Report> {
    return this.databaseConnection.getRepository(Report).findOne({
      where: {
        id,
      },
      relations: ['reportDefinition', 'reportDefinition.fields'],
    })
  }

  public getAllReportsByType(type: string): Promise<Report[]> {
    return this.databaseConnection.getRepository(Report).find({
      where: {
        reportDefinition: {
          type,
        },
      },
      relations: ['reportDefinition'],
    })
  }

  public getDefinitionByType(type: string): Promise<ReportDefinition> {
    return this.databaseConnection.getRepository(ReportDefinition).findOne({
      select: ['id'],
      where: {
        type,
      },
    })
  }
}
