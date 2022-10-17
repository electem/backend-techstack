import {Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn} from "typeorm";
import { Customer } from "./customer"
@Entity()
export class CustomerGroup {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(_type => Customer, (customer: Customer) => customer.customergroup, {
        cascade: true,
    })
    customer!: Array<Customer>
}