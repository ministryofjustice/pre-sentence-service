import { EntityManager, getConnection } from 'typeorm'
import ReportStatusHistory from '../repositories/entities/reportStatusHistory'

export const DELETED_STATUS = 'DELETED'

export interface IStatusChange {
  reportId: string
  previousStatus: string | null
  newStatus: string
  changedBy: string
}

export default class ReportStatusHistoryService {
  public async recordStatusChange(
    change: IStatusChange,
    manager: EntityManager = getConnection().manager
  ): Promise<ReportStatusHistory> {
    const repository = manager.getRepository(ReportStatusHistory)
    return repository.save({
      ...change,
      changedAt: new Date(),
    })
  }

  public async removeStatusChange(id: string, manager: EntityManager = getConnection().manager): Promise<void> {
    const repository = manager.getRepository(ReportStatusHistory)
    await repository.delete(id)
  }

  public async hasEverHadStatus(
    reportId: string,
    status: string,
    manager: EntityManager = getConnection().manager
  ): Promise<boolean> {
    const repository = manager.getRepository(ReportStatusHistory)
    const count = await repository.count({
      where: [
        { reportId, newStatus: status },
        { reportId, previousStatus: status },
      ],
    })
    return count > 0
  }

  public async getLatestStatusChangeTo(
    reportId: string,
    newStatus: string,
    manager: EntityManager = getConnection().manager
  ): Promise<ReportStatusHistory | null> {
    const repository = manager.getRepository(ReportStatusHistory)
    const result = await repository.findOne({
      where: { reportId, newStatus },
      order: { changedAt: 'DESC' },
    })
    return result ?? null
  }
}
