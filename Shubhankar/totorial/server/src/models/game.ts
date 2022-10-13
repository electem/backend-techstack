import {Entity, PrimaryGeneratedColumn, Column,ManyToMany,JoinTable} from "typeorm";
import { Player } from "./player";

@Entity()
export class Games {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToMany(() => Player, (players) => players.games,{
        cascade: true,
    })
    @JoinTable()
    players!: Player[]

}