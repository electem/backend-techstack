/* eslint-disable prettier/prettier */
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { CustomerGroup } from 'src/customerGroup/customergroup.entity';
import { Customer } from './customer.entity';

@Table
export class customerCustomerGroup extends Model<customerCustomerGroup> {
  @ForeignKey(() => Customer)
  @Column
  customerId: number;

  @ForeignKey(() => CustomerGroup)
  @Column
  customergroupId: number;
}
