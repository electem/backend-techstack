import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { CompanyDepartment } from 'src/company/entity/company-group-entity';

import { Company } from 'src/company/entity/company.entity';

@Table({ tableName: 'department' })
export class Department extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name?: string;

  @Column
  type?: string;

  @BelongsToMany(() => Company, () => CompanyDepartment)
  company: Company[];
}
