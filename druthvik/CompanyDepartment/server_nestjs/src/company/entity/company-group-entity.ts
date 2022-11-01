/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Department } from 'src/department/entity/department.entity';
import { Company } from './company.entity';
@Table({ tableName: 'company_department', timestamps: false })
export class CompanyDepartment extends Model {
  @ForeignKey(() => Department)
  @Column
  departmentId: number;

  @ForeignKey(() => Company)
  @Column
  companyId: number;
}
