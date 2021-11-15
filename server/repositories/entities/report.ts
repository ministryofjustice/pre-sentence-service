import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import ReportDefinition from './reportDefinition'
import FieldValue from './fieldValue'

@Entity('report')
export default class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: 'NOT_STARTED' })
  status: string

  @ManyToOne('ReportDefinition', 'reports', { eager: true })
  reportDefinition: ReportDefinition

  @OneToMany('FieldValue', 'report', { eager: true })
  fieldValues: Array<FieldValue> | null
}
