/* eslint-disable prettier/prettier */
import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { CustomerGroup } from 'src/customergroup/entity/customergroup.entity';
import { CustomerCustomerGroup } from './customergroup-customer.entity';
import { Unit } from 'src/unit/entity/unit.entity';
import { UnitCustomer } from 'src/unit/entity/customer-unit.entity';
@Table
export class Customer extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name?: string;

  @Column
  phonenumber?: number;

  @Column
  address?: string;

  @Column
  status?: string;

  @BelongsToMany(() => CustomerGroup, () => CustomerCustomerGroup)
  customergroup: CustomerGroup[];

  @BelongsToMany(() => Unit, () => UnitCustomer)
  unit: Unit[];
}
