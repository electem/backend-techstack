/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize-typescript';
import { Image } from './fileupload/fileupload.entity';

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
      sequelize.addModels([Image]);
      await sequelize.sync();
      return sequelize;
    },
    
  },
];
