import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Department } from 'src/department/entity/department.entity';
import { CompanyDepartment } from './company-group-entity';

@Table({ tableName: 'company' })
export class Company extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name?: string;

  @Column
  address?: string;

  @BelongsToMany(() => Department, () => CompanyDepartment)
  department: Department[];
}
