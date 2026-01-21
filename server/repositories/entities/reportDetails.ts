import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import PersonDetails from './personDetails'

export enum ReportStatus {
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
}

interface Question {
  id: number
  value: string
  answer: string
}

interface Page {
  name: string
  questions: Question[]
}

@Entity({ schema: 'presentenceservice' })
export default class ReportDetails {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  personId!: number

  @Column({
    type: 'enum',
    enum: ReportStatus,
    default: ReportStatus.NOT_STARTED,
  })
  status!: ReportStatus

  @Column()
  origin!: string

  @Column({ type: 'jsonb', nullable: true })
  pages?: Page[]

  @Column()
  reportType!: string

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

  @OneToOne(() => PersonDetails, { eager: true })
  @JoinColumn({ name: 'personId' })
  person!: PersonDetails
}
