import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm"
import { Category } from "./category"

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column()
    text!: string

    // @ManyToMany(() => Category, (category) => category.questions,{
    //     cascade: true,
    // })
    // @JoinTable()
    // categories!: Category[]
}