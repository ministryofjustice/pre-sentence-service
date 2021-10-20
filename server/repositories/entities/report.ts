import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import ReportDefinition from './reportDefinition'

@Entity({ name: 'report' })
export default class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'status', default: 'NOT_STARTED' })
  status: string

  @ManyToOne(() => ReportDefinition)
  @JoinColumn({ name: 'report_definition_id' })
  report_definition_id: ReportDefinition
}
