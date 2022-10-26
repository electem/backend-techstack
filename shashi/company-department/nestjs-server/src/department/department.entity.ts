/* eslint-disable prettier/prettier */
import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Company } from 'src/company/company.model';
import { CompanyDepartment } from './company-department.entity';

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
  @BelongsToMany(() => Company, () => CompanyDepartment)
  company: Company[];
}
