import { Column, Model, Table } from 'sequelize-typescript';
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
}
