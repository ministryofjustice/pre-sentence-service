import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Report from './report'
import ReportDefinitionFields from './reportDefinitionFields'

@Entity('report_definition')
export default class ReportDefinition {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: string

  @Column()
  version: number

  @OneToMany('Report', 'id')
  reports: Array<Report> | null

  @OneToMany('ReportDefinitionFields', 'reportDefinition', { eager: true })
  fields: Array<ReportDefinitionFields> | null
}
