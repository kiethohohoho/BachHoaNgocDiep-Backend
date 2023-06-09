const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize('BachHoaNgocDiep', 'sa', 'b4chH04Ng0cD13p', {
  host: config.env !== 'production' ? '116.118.51.72' : 'db',
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
