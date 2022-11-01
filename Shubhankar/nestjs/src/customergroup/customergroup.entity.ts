/* eslint-disable prettier/prettier */
import {
  Column,
  Table,
  Model,
  CreatedAt,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany
} from 'sequelize-typescript';
import { Customer } from 'src/customer/customer.entity';
import { customerCustomerGroup } from 'src/customer/customerCustomergroup.model';

@Table
export class Customergroup extends Model<Customergroup> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @BelongsToMany(() => Customer, ()=> customerCustomerGroup)
  customer:Customer[];
}

