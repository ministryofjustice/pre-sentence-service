import PersonDetails from '../repositories/entities/personDetails'
import PersonDetailsRepository from '../repositories/personDetailsRepository'

export interface IPersonDetails {
  id?: number
  crn: string
  createdBy: string
  isDeleted?: boolean
  version?: number
}

export default class PersonDetailsService {
  constructor(private readonly personDetailsRepository = new PersonDetailsRepository()) {}

  public async createPersonDetails(personData: IPersonDetails): Promise<PersonDetails> {
    const person = this.personDetailsRepository.create({
      ...personData,
      createdAt: new Date(),
      lastUpdatedBy: new Date(),
      isDeleted: false,
      version: 1,
    })
    return this.personDetailsRepository.save(person)
  }

  public async getPersonDetailsByCrn(crn: string): Promise<PersonDetails | null> {
    return this.personDetailsRepository.findByCrn(crn.toUpperCase())
  }

  public async getPersonDetailsById(id: number): Promise<PersonDetails | null> {
    return this.personDetailsRepository.findById(id)
  }

  public async deletePersonDetails(id: number): Promise<boolean> {
    const person = await this.personDetailsRepository.findByIdIncludingDeleted(id)

    if (!person) {
      return false
    }

    await this.personDetailsRepository.update(id, {
      isDeleted: true,
      lastUpdatedBy: new Date(),
    })

    return true
  }
}