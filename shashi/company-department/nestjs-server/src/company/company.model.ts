/* eslint-disable prettier/prettier */
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Company extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  companyname?: string;

  @Column
  address?: string;
}
