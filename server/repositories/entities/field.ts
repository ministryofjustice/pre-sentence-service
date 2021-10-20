import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'field' })
export default class Field {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Column({ name: 'type' })
  type: string

  @Column({ name: 'name' })
  name: string

  @Column({ name: 'required' })
  required: boolean

  @Column({ name: 'validation' })
  validation: string
}
