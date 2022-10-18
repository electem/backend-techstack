import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Customer } from "./customer";
@Entity()
export class CustomerGroup {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  groupname?: string;

  @Column()
  description?: string;

  @CreateDateColumn()
  createdat!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToMany(() => Customer, (customer) => customer.customerGroup, {
    cascade: true,
  })
  @JoinTable()
  customers!: Customer[];
}
