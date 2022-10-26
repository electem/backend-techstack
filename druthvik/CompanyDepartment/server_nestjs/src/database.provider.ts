/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize-typescript';
import { Company } from './company/entity/company.entity';
import { Department } from './department/entity/department.entity';
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
        database: 'companydept',
      });
      sequelize.addModels([Company, Department]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
