/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize-typescript';
import { ImageFileDto } from './fileupload/fileupload.entity';

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
        database: 'postgres',
      });
      sequelize.addModels([ImageFileDto]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
