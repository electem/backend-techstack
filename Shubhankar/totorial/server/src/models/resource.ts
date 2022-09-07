import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn, ManyToMany, ManyToOne} from "typeorm";
import {Product} from './product';

@Entity()
export class Resource {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    email!: string;

    @ManyToOne(_type=> Product, (product: Product) => product.resource)
    Products!: Array<Product>;
    
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}