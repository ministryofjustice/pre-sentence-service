import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'report_definition_fields' })
export default class ReportDefinitionFields {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Column({ name: 'report_definition_id' })
  report_definition_id: number

  @Column({ name: 'field_id' })
  field_id: number
}
