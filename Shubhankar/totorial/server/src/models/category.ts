import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { Tutorials } from "./tutorials"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @ManyToMany(() => Tutorials, (tutorials) => tutorials.categories)
    tutorials!: Tutorials[]
}