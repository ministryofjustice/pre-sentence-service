import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class Field {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  validation: string
}
