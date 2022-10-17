import {Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, ManyToMany, JoinTable} from "typeorm";
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

    // @OneToMany(_type => Customer, (customer: Customer) => customer.customergroup, {
    //     cascade: true,
    // })
    // customer!: Array<Customer>

    @ManyToMany((_type) => Customer, (customer) => customer.customergroups, {
        cascade: true,
      })
      @JoinTable()
      customers!: Customer[];
}