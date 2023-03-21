const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');

const Order = sequelize.define(
  'Orders',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    customerID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    shipperID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    deliveryAddressID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tenantID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // OrderDate: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // DeliveryDate: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    //   primaryKey: true,
    // },
  },
  {
    timestamps: true,
    createdAt: 'createDate',
    updatedAt: 'updateDate',
    indexes: [],
  }
);

Order.sync({ force: true })
  .then(() => {
    loggers.info('Order table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Order table:', err);
  });

module.exports = Order;
