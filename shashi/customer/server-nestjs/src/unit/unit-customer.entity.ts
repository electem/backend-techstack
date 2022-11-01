/* eslint-disable prettier/prettier */
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Customer } from '../customer/customer.entity';
import { Unit } from './unit.entity';

@Table
export class customerUnit extends Model<customerUnit> {
  @ForeignKey(() => Unit)
  @Column
  unitId: number;

  @ForeignKey(() => Customer)
  @Column
  customerId: number;
}
