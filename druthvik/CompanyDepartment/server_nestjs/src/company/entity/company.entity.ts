import { Column, Model, Table } from 'sequelize-typescript';
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
}
