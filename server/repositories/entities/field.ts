import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class Field {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  required: boolean

  @Column({ nullable: true })
  validation: string
}
