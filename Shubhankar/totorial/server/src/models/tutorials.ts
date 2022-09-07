import {Entity, PrimaryGeneratedColumn, Column,ManyToMany,JoinTable, UpdateDateColumn, CreateDateColumn, OneToMany} from "typeorm";
import { Category } from "./category";
import { Comment } from "./comment";

@Entity()
export class Tutorials {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column({ nullable: true})
    timezone!: string;

    @CreateDateColumn()
    createdAt!: Date;

@ManyToMany(() => Category, (category) => category.tutorials,{
        cascade: true,
    })
    @JoinTable()
    categories!: Category[];


@OneToMany(_type=> Comment, (comment: Comment) => comment.tutorials)
    comments!: Comment[];
    
}