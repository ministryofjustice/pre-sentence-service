import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Report from './report'
import Field from './field'

@Entity('field_value')
export default class FieldValue {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fieldId: number

  @Column({ nullable: true })
  value: string

  @Column()
  version: number

  @ManyToOne('Field', 'id', { eager: true })
  @JoinColumn()
  field: Field

  @ManyToOne('Report', 'id')
  report: Report
}
