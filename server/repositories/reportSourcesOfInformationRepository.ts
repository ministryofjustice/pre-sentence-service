import { In } from 'typeorm'
import ReportSourcesOfInformation from './entities/reportSourcesOfInformation'
import BaseRepository from './baseRepository'

// Repository for managing the relationship between reports and sources of information
export class ReportSourcesOfInformationRepository extends BaseRepository<ReportSourcesOfInformation> {
  constructor() {
    super(ReportSourcesOfInformation)
  }

  public findByReportId(reportId: string): Promise<ReportSourcesOfInformation[]> {
    return this.repo().find({
      where: { reportId, isDeleted: false },
      relations: ['sourcesOfInformation'],
    })
  }

  public findByReportIdAndSourceIds(reportId: string, sourceIds: number[]): Promise<ReportSourcesOfInformation[]> {
    return this.repo().find({
      where: { reportId, sourcesOfInformationId: In(sourceIds) },
    })
  }
}
