import {
    CreateDateColumn,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm'
import { Memo } from '../memo/entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', nullable: false })
    email: string

    @Column({ type: 'varchar', nullable: false })
    password: string

    @OneToMany((type) => Memo, (memo) => memo.user)
    memos: Memo[]

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string
}
