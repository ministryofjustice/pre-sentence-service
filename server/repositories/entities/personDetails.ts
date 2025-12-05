import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

interface Names {
  foreName: string
  middleName: string
  surname: string
}

interface Address {
  noFixedAbode: boolean
  buildingNumber: string
  addressNumber: string
  streetName: string
  town: string
  district: string
  county: string
  postcode: string
}

interface Court {
  name: string
  localJusticeArea: string
}

interface OtherOffence {
  description: string
  code: string
}

@Entity({ schema: 'presentenceservice' })
export default class PersonDetails {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  crn!: string

  @Column({ type: 'jsonb' })
  names!: Names

  @Column({ type: 'datetime' })
  dateOfBirth!: Date

  @Column()
  pnc!: string

  @Column({ type: 'jsonb', nullable: true })
  address?: Address

  @Column()
  mainOffence!: string

  @Column({ type: 'jsonb', nullable: true })
  otherOffences?: OtherOffence[]

  @Column({ type: 'jsonb' })
  court!: Court

  @Column({ type: 'datetime' })
  createdAt!: Date

  @Column()
  createdBy!: string

  @Column({ type: 'datetime' })
  lastUpdatedBy!: Date

  @Column()
  isDeleted!: boolean

  @Column({ nullable: true })
  version?: number
}
