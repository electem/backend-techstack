import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Customer } from 'src/customer/entity/customer.entity';
import { UnitCustomer } from './customer-unit.entity';
@Table
export class Unit extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name?: string;

  @Column
  descritption?: string;

  @BelongsToMany(() => Customer, () => UnitCustomer)
  customer: Customer[];
}
