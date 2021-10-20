import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'report_definition' })
export default class ReportDefinition {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Column({ name: 'type' })
  type: string

  @Column({ name: 'version' })
  version: number
}
