/* eslint-disable prettier/prettier */
export const databaseConfig = {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: 'root',
  DB: 'nodejsTypescript',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
