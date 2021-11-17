import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import ReportDefinitionFields from './reportDefinitionFields'

@Entity('report_definition')
export default class ReportDefinition {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: string

  @Column()
  version: number

  @OneToMany(() => ReportDefinitionFields, entity => entity.reportDefinition, { eager: true })
  fields: Array<ReportDefinitionFields> | []
}
