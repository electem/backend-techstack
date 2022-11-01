import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize('sqlite::memory:');
const File = sequelize.define('file', {
  type: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  data: {
    type: DataTypes.BLOB('long'),
  },
});
