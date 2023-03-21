const Sequelize = require('sequelize');
const loggers = require('./logger');

const sequelize = new Sequelize('BachHoaNgocDiep', 'sa', 'hahaho.vn123', {
  dialect: 'mssql',
  host: 'bachhoangocdiep.com',
  port: 1433,
  dialectOptions: {
    options: {
      trustedConnection: true,
      encrypt: true,
    },
  },
});

sequelize
  .authenticate()
  .then(() => loggers.info('Connection has been established successfully.'))
  .catch((error) => loggers.error('Unable to connect to the database:', error));

module.exports = sequelize;
