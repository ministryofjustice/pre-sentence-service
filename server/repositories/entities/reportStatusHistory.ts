import { Column, Entity, PrimaryGeneratedColumn, Generated } from 'typeorm'

@Entity({ schema: 'presentenceservice', name: 'report_status_history' })
export default class ReportStatusHistory {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id!: string

  @Column({ type: 'uuid' })
  reportId!: string

  @Column({ type: 'text', nullable: true })
  previousStatus?: string | null

  @Column({ type: 'text' })
  newStatus!: string

  @Column()
  changedBy!: string

  @Column({ type: 'timestamp' })
  changedAt!: Date
}
