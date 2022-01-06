import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import Field from './field'

@Entity()
export default class ReportDefinition {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: string

  @Column()
  version: number

  @ManyToMany(() => Field, { eager: true })
  @JoinTable({ name: 'report_definition_fields' })
  fields: Array<Field>
}
