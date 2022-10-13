import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany} from "typeorm";
import { Resource } from "./resource";

@Entity('product')
export class Product {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'text'
    })
    name!: string;

    @Column({ nullable: true })
    resid!: number;
    @OneToMany(_type => Resource, (resource: Resource) => resource.Products)
    @JoinColumn()
    resource!: Resource;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}