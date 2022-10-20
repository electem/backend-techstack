/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize-typescript';
import { Customer } from './customer/entity/customer.entity';
import { CustomerGroup } from './customergroup/entity/customergroup.entity';
import { CustomerCustomerGroup } from './customer/entity/customergroup-customer.entity';
import { Unit } from './unit/entity/unit.entity';
import { UnitCustomer } from './unit/entity/customer-unit.entity';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'nodejsTypescript',
      });
      sequelize.addModels([
        Customer,
        CustomerGroup,
        CustomerCustomerGroup,
        Unit,
        UnitCustomer,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
