import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('field')
export default class Field {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: string

  @Column()
  name: string

  @Column()
  required: boolean

  @Column({ nullable: true })
  validation: string
}
