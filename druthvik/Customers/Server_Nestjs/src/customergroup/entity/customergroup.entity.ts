/* eslint-disable prettier/prettier */
import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Customer } from 'src/customer/entity/customer.entity';
import { CustomerCustomerGroup } from 'src/customer/entity/customergroup-customer.entity';
@Table
export class CustomerGroup extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name?: string;

  @Column
  descritption?: string;

  @BelongsToMany(() => Customer, () => CustomerCustomerGroup)
  customer: Customer[];
}
