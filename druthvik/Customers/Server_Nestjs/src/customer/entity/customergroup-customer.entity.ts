/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { CustomerGroup } from 'src/customergroup/entity/customergroup.entity';
import { Customer } from './customer.entity';

@Table
export class CustomerCustomerGroup extends Model {
  @ForeignKey(() => CustomerGroup)
  @Column
  customergroupId: number;

  @ForeignKey(() => Customer)
  @Column
  customerId: number;
}
