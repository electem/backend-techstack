import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Customer } from "./customer";
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

  @ManyToMany((_type) => Customer, (customer) => customer.customergroups, {
    cascade: true,
  })
  @JoinTable()
  customers!: Customer[];
}
