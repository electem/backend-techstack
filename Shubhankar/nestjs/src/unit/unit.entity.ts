/* eslint-disable prettier/prettier */
import {
  Column,
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';
import { Customer } from 'src/customer/customer.entity';
import { customerUnit } from './customerunit.model';

@Table
export class Unit extends Model<Unit> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @BelongsToMany(() => Customer, () => customerUnit)
  customer: Customer[];
}
