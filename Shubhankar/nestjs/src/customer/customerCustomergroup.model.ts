/* eslint-disable prettier/prettier */

    import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
    import { Customergroup } from 'src/customergroup/customergroup.entity';
    import { Customer } from './customer.entity';
    
    @Table({ tableName: "customer_group", timestamps: false })
    export class customerCustomerGroup extends Model<customerCustomerGroup> {
      @ForeignKey(() => Customer)
      @Column
      customerId: number;
    
      @ForeignKey(() => Customergroup)
      @Column
      customergroupId: number;
    }