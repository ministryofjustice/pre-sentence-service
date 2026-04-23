import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ schema: 'presentenceservice' })
export default class PersonDetails {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  crn!: string

  @Column({ type: 'timestamp' })
  createdAt!: Date

  @Column()
  createdBy!: string

  @Column({ type: 'timestamp' })
  lastUpdatedBy!: Date

  @Column()
  isDeleted!: boolean

  @Column({ nullable: true })
  version?: number
}
