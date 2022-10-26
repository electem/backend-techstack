/* eslint-disable prettier/prettier */
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Department extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  departmentname?: string;

  @Column
  type?: string;
}
