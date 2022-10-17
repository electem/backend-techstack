import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { CustomerGroup } from "./customerGroup";
@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  customername?: string;

  @Column()
  status?: string;

  @Column()
  street?: string;

  @Column()
  postalcode?: string;

  @Column({ type: "varchar", length: 10 })
  phonenumber?: number;

  @CreateDateColumn()
  createdat!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToMany(
    (_type) => CustomerGroup,
    (customerGroup) => customerGroup.customers
  )
  @JoinTable()
  customerGroups!: CustomerGroup[];
}
