/* eslint-disable prettier/prettier */
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Customer } from 'src/customer/customer.entity';
import { Unit } from './unit.entity';

@Table({ tableName: "customer_unit", timestamps: false })
export class customerUnit extends Model<customerUnit> {
  @ForeignKey(() => Unit)
  @Column
  unitId: number;

  @ForeignKey(() => Customer)
  @Column
  customerId: number;
}
