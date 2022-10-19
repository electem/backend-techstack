/* eslint-disable prettier/prettier */
import { Column, Model, Table } from 'sequelize-typescript';
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
}
