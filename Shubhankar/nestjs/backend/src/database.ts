/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize-typescript';
import { Customer } from './customer/customer.entity';
import { Customergroup } from './customergroup/customergroup.entity';


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
      sequelize.addModels([Customer, Customergroup]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
