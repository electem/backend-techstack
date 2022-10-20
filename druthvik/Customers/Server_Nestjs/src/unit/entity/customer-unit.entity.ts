/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Customer } from '../../customer/entity/customer.entity';
import { Unit } from './unit.entity';
@Table
export class UnitCustomer extends Model {
  @ForeignKey(() => Customer)
  @Column
  customerId: number;

  @ForeignKey(() => Unit)
  @Column
  unitId: number;
}
