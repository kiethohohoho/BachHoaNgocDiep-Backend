const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');

const OrderDetail = sequelize.define('user', {
  ReviewID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  ProductID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CustomerID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Rating: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

OrderDetail.sync({ force: true })
  .then(() => {
    loggers.info('OrderDetail table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating OrderDetail table:', err);
  });

module.exports = OrderDetail;
