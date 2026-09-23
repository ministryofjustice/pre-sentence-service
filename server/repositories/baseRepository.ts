import { getConnection } from 'typeorm'
import type {
  DeepPartial,
  EntityTarget,
  ObjectLiteral,
  QueryDeepPartialEntity,
  Repository,
  UpdateResult,
} from 'typeorm'

// Convention: repositories return null for a missing row; they never throw for "not found".
export default abstract class BaseRepository<T extends ObjectLiteral> {
  protected constructor(private readonly entityTarget: EntityTarget<T>) {}

  private cachedRepo?: Repository<T>

  protected repo() {
    if (!this.cachedRepo) this.cachedRepo = getConnection().getRepository(this.entityTarget)
    return this.cachedRepo
  }

  public create(data: DeepPartial<T>): T {
    return this.repo().create(data)
  }

  public save(entity: T): Promise<T> {
    return this.repo().save(entity)
  }

  public update(id: number | string, data: QueryDeepPartialEntity<T>): Promise<UpdateResult> {
    return this.repo().update(id, data)
  }
}
