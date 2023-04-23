const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');

const Order = sequelize.define(
  'Orders',
  {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    AccountID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    AddressId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    deliveryAddressID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    tenantID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TotalAmount: {
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
