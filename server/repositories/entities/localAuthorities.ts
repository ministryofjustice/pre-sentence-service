import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ schema: 'presentenceservice' })
export default class LocalAuthorities {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

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
