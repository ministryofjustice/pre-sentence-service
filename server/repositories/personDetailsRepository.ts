import PersonDetails from './entities/personDetails'
import BaseRepository from './baseRepository'

export default class PersonDetailsRepository extends BaseRepository<PersonDetails> {
  constructor() {
    super(PersonDetails)
  }

  public findByCrn(crn: string): Promise<PersonDetails | null> {
    return this.repo().findOne({ where: { crn, isDeleted: false } })
  }

  public findById(id: number): Promise<PersonDetails | null> {
    return this.repo().findOne({ where: { id, isDeleted: false } })
  }

  public findByIdIncludingDeleted(id: number): Promise<PersonDetails | null> {
    return this.repo().findOne({ where: { id } })
  }
}
