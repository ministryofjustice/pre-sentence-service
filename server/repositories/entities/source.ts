import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import Report from './report'

@Entity({ name: 'sources' })
export default class Source {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  key: string

  @Column({ type: 'text' })
  label: string

  @Column({ type: 'uuid', name: 'reportId', nullable: true })
  reportId: string | null

  @ManyToOne(() => Report, r => r.sources, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'reportId' })
  report?: Report | null
}
