import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class PhoneNumber {
    @PrimaryGeneratedColumn()
    declare id: number

    @Column()
    declare number: number

    @Column()
    declare guildId: string

    @Column()
    declare channelId: string
}