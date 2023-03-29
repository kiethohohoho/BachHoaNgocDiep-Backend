const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize('BachHoaNgocDiep', 'sa', 'hahaho.vn123', {
  host: config.env !== 'production' ? 'bachhoangocdiep.com' : 'db',
  port: 1433,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      trustedConnection: true,
      encrypt: config.env !== 'production',
    },
  },
});

module.exports = sequelize;
