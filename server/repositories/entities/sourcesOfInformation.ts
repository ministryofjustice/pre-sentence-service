import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ schema: 'presentenceservice' })
export default class SourcesOfInformation {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  value!: string

  @Column()
  isDefault!: boolean

  @Column()
  source!: string

  @Column({ nullable: true })
  createdAt?: string

  @Column({ nullable: true })
  createdBy?: string

  @Column({ nullable: true })
  lastUpdatedAt?: string

  @Column({ nullable: true })
  lastUpdatedBy?: string

  @Column({ nullable: true })
  isDeleted?: boolean

  @Column({ nullable: true })
  version?: number
}
