import { getConnection } from 'typeorm'
import PersonDetails from '../repositories/entities/personDetails'

export interface IPersonDetails {
  id?: number
  crn: string
  createdBy: string
  isDeleted?: boolean
  version?: number
}

export default class PersonDetailsService {
  public async createPersonDetails(personData: IPersonDetails): Promise<PersonDetails> {
    const personRepository = getConnection().getRepository(PersonDetails)
    const person = personRepository.create({
      ...personData,
      createdAt: new Date(),
      lastUpdatedBy: new Date(),
      isDeleted: false,
      version: 1,
    })
    return personRepository.save(person)
  }

  public async getPersonDetailsByCrn(crn: string): Promise<PersonDetails | null> {
    return getConnection()
      .getRepository(PersonDetails)
      .findOne({
        where: {
          crn: crn.toUpperCase(),
          isDeleted: false,
        },
      })
  }

  public async getPersonDetailsById(id: number): Promise<PersonDetails | null> {
    return getConnection()
      .getRepository(PersonDetails)
      .findOne({
        where: {
          id,
          isDeleted: false,
        },
      })
  }

  public async deletePersonDetails(id: number): Promise<boolean> {
    const personRepository = getConnection().getRepository(PersonDetails)
    const person = await personRepository.findOne({ where: { id } })

    if (!person) {
      return false
    }

    await personRepository.update(id, {
      isDeleted: true,
      lastUpdatedBy: new Date(),
    })

    return true
  }
}
