import { getConnection } from 'typeorm'
import PersonDetails from './entities/personDetails'

export default class PersonDetailsRepository {
  private repo() {
    return getConnection().getRepository(PersonDetails)
  }

  public create(data: Partial<PersonDetails>): PersonDetails {
    return this.repo().create(data)
  }

  public save(person: PersonDetails): Promise<PersonDetails> {
    return this.repo().save(person)
  }

  public findByCrn(crn: string): Promise<PersonDetails | null> {
    return this.repo().findOne({
      where: { crn, isDeleted: false },
    })
  }

  public findById(id: number): Promise<PersonDetails | null> {
    return this.repo().findOne({
      where: { id, isDeleted: false },
    })
  }

  public findByIdIncludingDeleted(id: number): Promise<PersonDetails | null> {
    return this.repo().findOne({ where: { id } })
  }

  public update(id: number, data: Partial<PersonDetails>): Promise<unknown> {
    return this.repo().update(id, data)
  }
}