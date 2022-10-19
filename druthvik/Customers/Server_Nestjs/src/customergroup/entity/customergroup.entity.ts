/* eslint-disable prettier/prettier */
import { Column, Model, Table } from 'sequelize-typescript';
@Table
export class CustomerGroup extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name?: string;

  @Column
  descritption?: string;
}
