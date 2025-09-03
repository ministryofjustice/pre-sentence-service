import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import ReportDefinition from './reportDefinition'
import FieldValue from './fieldValue'
import Source from './source'

@Entity()
export default class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: 'NOT_STARTED' })
  status: string

  @Column()
  lastUpdated: string

  @Column()
  reportDefinitionId: number

  @Column()
  eventNumber: string

  @ManyToOne(() => ReportDefinition, entity => entity.id, { eager: true })
  reportDefinition: ReportDefinition

  @OneToMany(() => FieldValue, entity => entity.report, { eager: true })
  fieldValues: Array<FieldValue>

  @OneToMany(() => Source, entity => entity.report, { eager: true })
  sources?: Array<Source>
}
