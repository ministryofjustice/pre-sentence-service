import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'report' })
export default class Report {
  @PrimaryGeneratedColumn({ name: 'report_id' })
  reportId: number

  @Column({ name: 'report_type' })
  reportType: string
}
