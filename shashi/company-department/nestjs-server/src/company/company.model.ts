/* eslint-disable prettier/prettier */
import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Department } from 'src/department/department.entity';
import { CompanyDepartment } from 'src/department/company-department.entity';

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

  @BelongsToMany(() => Department, () => CompanyDepartment ,)
  department: Department[];

}
