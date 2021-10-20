import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import ReportDefinition from './reportDefinition'
import Field from './field'

@Entity({ name: 'report' })
export default class Report {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @ManyToOne(() => ReportDefinition)
  @JoinColumn({ name: 'report_definition_id' })
  report_definition_id: ReportDefinition

  @OneToMany(() => Field, field => field.id)
  @JoinColumn({ name: 'id' })
  fields: Field[]
}
