import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Report from './report'
import Field from './field'

@Entity()
export default class FieldValue {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fieldId: number

  @Column({ nullable: true })
  value: string

  @Column()
  version: number

  @Column()
  reportId: string

  @ManyToOne(() => Field, entity => entity.id, { eager: true })
  field: Field

  @ManyToOne(() => Report, entity => entity.id)
  report: Report
}
