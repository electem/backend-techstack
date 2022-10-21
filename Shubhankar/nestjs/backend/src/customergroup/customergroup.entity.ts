/* eslint-disable prettier/prettier */
import {
  Column,
  Table,
  Model,
  CreatedAt,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table
export class Customergroup extends Model<Customergroup> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @CreatedAt
  @Column
  createdAt: Date;
}
