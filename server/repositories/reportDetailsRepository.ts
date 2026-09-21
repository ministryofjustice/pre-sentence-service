import { getConnection } from 'typeorm'
import ReportDetails from './entities/reportDetails'

export default class ReportDetailsRepository {
  private repo() {
    return getConnection().getRepository(ReportDetails)
  }

  public create(data: Partial<ReportDetails>): ReportDetails {
    return this.repo().create(data)
  }

  public save(report: ReportDetails): Promise<ReportDetails> {
    return this.repo().save(report)
  }

  public findById(id: string): Promise<ReportDetails | null> {
    return this.repo().findOne({
      where: { id, isDeleted: false },
      relations: ['person'],
    })
  }

  public findByIdIncludingDeleted(id: string): Promise<ReportDetails | null> {
    return this.repo().findOne({ where: { id } })
  }

  public findByType(reportType: string): Promise<ReportDetails[]> {
    return this.repo().find({
      where: { reportType, isDeleted: false },
      relations: ['person'],
    })
  }

  public findAndCountPaginated(skip: number, take: number): Promise<[ReportDetails[], number]> {
    return this.repo().findAndCount({
      where: { isDeleted: false },
      relations: ['person'],
      order: { createdAt: 'DESC' },
      skip,
      take,
    })
  }

  public merge(report: ReportDetails, data: Partial<ReportDetails>): ReportDetails {
    return this.repo().merge(report, data)
  }

  public update(id: string, data: Partial<ReportDetails>): Promise<unknown> {
    return this.repo().update(id, data)
  }
}