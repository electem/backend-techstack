/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize-typescript';
import { Company } from './company/company.model';
import { Department } from './department/department.entity';
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
        database: 'company',
      });
      sequelize.addModels([Company, Department]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
