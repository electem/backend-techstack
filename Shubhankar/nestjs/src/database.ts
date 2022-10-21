/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize-typescript';
import { Customer } from './customer/customer.entity';
import { customerCustomerGroup } from './customer/customerCustomergroup.model';
import { Customergroup } from './customergroup/customergroup.entity';
import { customerUnit } from './unit/customerunit.model';
import { Unit } from './unit/unit.entity';


export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'cybis@ban',
        database: 'customern',
      });
      sequelize.addModels([Customer, Customergroup,customerCustomerGroup,Unit,customerUnit]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
