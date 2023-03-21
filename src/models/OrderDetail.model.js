const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');

const OrderDetail = sequelize.define(
  'OrderDetails',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tenantID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: 'createDate',
    updatedAt: 'updateDate',
    indexes: [],
  }
);

OrderDetail.sync({ force: true })
  .then(() => {
    loggers.info('OrderDetail table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating OrderDetail table:', err);
  });

module.exports = OrderDetail;
