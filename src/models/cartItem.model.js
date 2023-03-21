const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');

const CartItem = sequelize.define('user', {
  CustomerID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  ProductID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CreatedDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ModifiedDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

CartItem.sync({ force: true })
  .then(() => {
    loggers.info('CartItem table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating CartItem table:', err);
  });

module.exports = CartItem;
