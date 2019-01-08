import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm'

@Entity()
export default class UserInfo {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  sex: string

  @Column()
  score: number

  @CreateDateColumn()
  create_at: Date

  @UpdateDateColumn()
  update_at: Date
}
