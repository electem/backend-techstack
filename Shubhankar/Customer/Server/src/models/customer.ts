import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { CustomerGroup } from "./customergroup";
@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  status!: string;

  @Column()
  address!: string;

  @Column({ type: "varchar", length: 10 })
  phonenumber!: number;

  // @ManyToOne(_type => CustomerGroup, (customergroup: CustomerGroup) => customergroup.customer)
  // @JoinColumn()
  // customergroup!: CustomerGroup;

  @ManyToMany(() => CustomerGroup, (customergroup) => customergroup.customers)
  customergroups!: Customer[];
}