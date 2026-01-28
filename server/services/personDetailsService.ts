import { getConnection } from 'typeorm'
import PersonDetails from '../repositories/entities/personDetails'

export interface IPersonDetails {
  id?: number
  crn: string
  names: {
    foreName: string
    middleName: string
    surname: string
  }
  dateOfBirth: Date
  pnc: string
  address?: {
    noFixedAbode: boolean
    buildingNumber: string
    addressNumber: string
    streetName: string
    town: string
    district: string
    county: string
    postcode: string
  }
  mainOffence: string
  otherOffences?: Array<{
    description: string
    code: string
  }>
  court: {
    name: string
    localJusticeArea: string
  }
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

  public async updatePersonDetails(id: number, personData: Partial<IPersonDetails>): Promise<PersonDetails | null> {
    const personRepository = getConnection().getRepository(PersonDetails)
    const person = await personRepository.findOne({
      where: { id, isDeleted: false },
    })

    if (!person) {
      return null
    }

    const updated = personRepository.merge(person, {
      ...personData,
      lastUpdatedBy: new Date(),
      version: (person.version || 1) + 1,
    })

    return personRepository.save(updated)
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
