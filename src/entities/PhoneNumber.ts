import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity()
@Index(["number", "guildId", "channelId"], { unique: true })
export class PhoneNumber {
    @PrimaryGeneratedColumn()
    declare id: number

    @Column()
    declare number: number

    @Column()
    declare guildId: string

    @Column()
    declare channelId: string

    @Column({ nullable: true })
    declare alias: string
}