export const databaseConfig = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "cybis@ban",
  DB: "postgres",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
