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
}
