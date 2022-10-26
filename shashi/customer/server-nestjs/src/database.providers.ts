/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize-typescript';
import { Customer } from './customer/customer.entity';
import { CustomerGroup } from './customerGroup/customergroup.entity';
import { customerCustomerGroup } from './customer/customer-customergroup.model';
import { Unit } from './unit/unit.entity';
import { customerUnit } from './unit/unit-customer.entity';
import { Image } from './fileupload-Download/file.entity';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'customernestjs',
      });
      sequelize.addModels([
        Customer,
        CustomerGroup,
        customerCustomerGroup,
        Unit,
        customerUnit,
        Image,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
