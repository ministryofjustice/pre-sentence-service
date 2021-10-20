import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'field_value' })
export default class FieldValue {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Column({ name: 'report_id' })
  report_id: number

  @Column({ name: 'field_id' })
  field_id: number

  @Column({ name: 'value' })
  value: string

  @Column({ name: 'version' })
  version: number
}
