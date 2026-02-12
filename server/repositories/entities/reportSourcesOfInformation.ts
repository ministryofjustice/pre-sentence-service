import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import ReportDetails from './reportDetails'
import SourcesOfInformation from './sourcesOfInformation'

@Entity({ schema: 'presentenceservice' })
export default class ReportSourcesOfInformation {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('uuid')
  reportId!: string

  @Column()
  sourcesOfInformationId!: number

  @Column({ type: 'timestamp' })
  createdAt!: Date

  @Column()
  createdBy!: string

  @Column({ type: 'timestamp' })
  lastUpdatedAt!: Date

  @Column()
  lastUpdatedBy!: string

  @Column()
  isDeleted!: boolean

  @Column({ nullable: true })
  version?: number

  @ManyToOne(() => ReportDetails, { eager: true })
  @JoinColumn({ name: 'reportId' })
  report!: ReportDetails

  @ManyToOne(() => SourcesOfInformation, { eager: true })
  @JoinColumn({ name: 'sourcesOfInformationId' })
  sourcesOfInformation!: SourcesOfInformation
}
