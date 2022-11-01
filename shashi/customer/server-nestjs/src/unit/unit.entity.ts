/* eslint-disable prettier/prettier */
import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { Customer } from 'src/customer/customer.entity';
import { customerUnit } from './unit-customer.entity';

@Table
export class Unit extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name?: string;

  @Column
  description?: string;

  @BelongsToMany(() => Customer, () => customerUnit)
  customer: Customer[];
}
