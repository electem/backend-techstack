import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { Games } from "./game"

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    address!: string


    @ManyToMany(() => Games, (games) => games.players)
    games!: Games[]
}