import { In } from 'typeorm'
import SourcesOfInformation from './entities/sourcesOfInformation'
import BaseRepository from './baseRepository'

export class SourcesOfInformationRepository extends BaseRepository<SourcesOfInformation> {
  constructor() {
    super(SourcesOfInformation)
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
}
