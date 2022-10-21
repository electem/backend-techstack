/* eslint-disable prettier/prettier */
import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { customerCustomerGroup } from 'src/customer/customer-customergroup.model';
import { Customer } from 'src/customer/customer.entity';

@Table
export class CustomerGroup extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  groupname?: string;

  @Column
  description?: string;

  @BelongsToMany(() => Customer, () => customerCustomerGroup)
  customer: Customer[];
}
