import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import ReportDefinition from './reportDefinition'
import Field from './field'

@Entity('report_definition_fields')
export default class ReportDefinitionFields {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  reportDefinitionId: number

  @Column()
  fieldId: number

  @ManyToOne('ReportDefinition', 'fields')
  reportDefinition: ReportDefinition

  @OneToOne('Field', 'id', { eager: true })
  @JoinColumn()
  field: Field
}
