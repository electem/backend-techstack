/* eslint-disable prettier/prettier */
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Company } from 'src/company/company.model';
import { Department } from './department.entity';

@Table
export class CompanyDepartment extends Model<CompanyDepartment> {
  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @ForeignKey(() => Department)
  @Column
  departmentId: number;
}
