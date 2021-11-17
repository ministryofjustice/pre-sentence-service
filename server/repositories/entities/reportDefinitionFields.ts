import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
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

  @ManyToOne(() => ReportDefinition, entity => entity.fields)
  reportDefinition: ReportDefinition

  @ManyToOne(() => Field, entity => entity.id, { eager: true })
  field: Field
}
