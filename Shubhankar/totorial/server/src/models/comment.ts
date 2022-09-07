import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn} from "typeorm";
import { Post } from "./post";
import { Tutorials } from "./tutorials";
import { User } from "./user";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'text'
    })
    content!: string;

    // @Column({ nullable: true })
    // userId!: number;
    // @ManyToOne(_type => User, (user: User) => user.comments)
    // @JoinColumn()
    // user!: User;


    @Column({ nullable: true })
    tutorialsId!: number;

    @ManyToOne(_type => Tutorials, (tutorials: Tutorials) => tutorials.comments)
    @JoinColumn()
    tutorials!: Tutorials[];


    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}