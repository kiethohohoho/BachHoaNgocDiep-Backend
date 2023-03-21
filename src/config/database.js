const Sequelize = require('sequelize');

const sequelize = new Sequelize('BachHoaNgocDiep', 'sa', 'hahaho.vn123', {
  host: 'bachhoangocdiep.com',
  port: 1433,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      trustedConnection: true,
      encrypt: true,
    },
  },
});

module.exports = sequelize;
