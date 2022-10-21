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
import { CustomergroupDto } from 'src/customergroup/dto/customergroup';

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

  @Column
  phonenumber?: number;
}
