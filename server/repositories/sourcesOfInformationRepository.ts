import { getConnection, In } from 'typeorm'
import SourcesOfInformation from './entities/sourcesOfInformation'
import ReportSourcesOfInformation from './entities/reportSourcesOfInformation'

export class SourcesOfInformationRepository {
  private repo() {
    return getConnection().getRepository(SourcesOfInformation)
  }

  public create(data: Partial<SourcesOfInformation>): SourcesOfInformation {
    return this.repo().create(data)
  }

  public save(source: SourcesOfInformation): Promise<SourcesOfInformation> {
    return this.repo().save(source)
  }

  public findAllDefault(): Promise<SourcesOfInformation[]> {
    return this.repo().find({
      where: { isDefault: true, isDeleted: false },
    })
  }

  public findCustomByValues(values: string[]): Promise<SourcesOfInformation[]> {
    return this.repo().find({
      where: { value: In(values), isDefault: false },
    })
  }

  public update(id: number, data: Partial<SourcesOfInformation>): Promise<unknown> {
    return this.repo().update(id, data)
  }
}

export class ReportSourcesOfInformationRepository {
  private repo() {
    return getConnection().getRepository(ReportSourcesOfInformation)
  }

  public create(data: Partial<ReportSourcesOfInformation>): ReportSourcesOfInformation {
    return this.repo().create(data)
  }

  public save(link: ReportSourcesOfInformation): Promise<ReportSourcesOfInformation> {
    return this.repo().save(link)
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

  public update(id: number, data: Partial<ReportSourcesOfInformation>): Promise<unknown> {
    return this.repo().update(id, data)
  }
}