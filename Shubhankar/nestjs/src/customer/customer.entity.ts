/* eslint-disable prettier/prettier */
import {
  Column,
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';
import { Customergroup } from 'src/customergroup/customergroup.entity';
import { customerUnit } from 'src/unit/customerunit.model';
import { Unit } from 'src/unit/unit.entity';
import { customerCustomerGroup } from './customerCustomergroup.model';

@Table
export class Customer extends Model<Customer> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id?: string;

  @Column
  name?: string;

  @Column
  status?: string;

  @Column
  address?: string;

  @Column({type: 'bigint'})
  phonenumber?: number;

  @BelongsToMany(() => Customergroup, ()=> customerCustomerGroup)
  customer:Customergroup[];

  @BelongsToMany(() => Unit, () => customerUnit)
   unit: Unit[];
}
