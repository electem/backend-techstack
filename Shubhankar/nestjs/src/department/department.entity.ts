/* eslint-disable prettier/prettier */
import {
    Column,
    Table,
    Model,
    PrimaryKey,
    CreatedAt,
  } from 'sequelize-typescript';

  
  @Table
  export class Department extends Model<Department> {
    @PrimaryKey
    @Column({
      primaryKey: true,
      autoIncrement: true,
    })
    id?: number;
  
    @Column
    name?: string;
  
    @Column
    type?: string;
  
 
   
  }
  