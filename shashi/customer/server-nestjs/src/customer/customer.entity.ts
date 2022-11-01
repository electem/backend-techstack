/* eslint-disable prettier/prettier */
import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { CustomerGroup } from '../customerGroup/customergroup.entity';
import { customerCustomerGroup } from './customer-customergroup.model';
import { Unit } from 'src/unit/unit.entity';
import { customerUnit } from 'src/unit/unit-customer.entity';

@Table
export class Customer extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  customername?: string;

  @Column
  status?: string;

  @Column
  street?: string;

  @Column
  postalcode?: string;

  @Column
  phonenumber?: number;

  @BelongsToMany(() => CustomerGroup, () => customerCustomerGroup)
  customer: CustomerGroup[];

  @BelongsToMany(() => Unit, () => customerUnit)
  units: Unit[];
}
