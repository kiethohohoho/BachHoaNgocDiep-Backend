const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');

const Price = sequelize.define('user', {
  PriceID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  ProductID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  StartDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  EndDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Price.sync({ force: true })
  .then(() => {
    loggers.info('Price table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Price table:', err);
  });

module.exports = Price;
