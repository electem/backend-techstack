/* eslint-disable prettier/prettier */
import {
  Column,
  Table,
  Model,
  PrimaryKey,
  CreatedAt,
} from 'sequelize-typescript';

@Table
export class Company extends Model<Company> {
  @PrimaryKey
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id?: number;

  @Column
  name?: string;

  @Column
  department?: string;

  @Column
  address?: string;

  
}
