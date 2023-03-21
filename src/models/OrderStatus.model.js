const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');

const Payment = sequelize.define(
  'Payments',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tenantID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
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

Payment.sync({ force: true })
  .then(() => {
    loggers.info('Payment table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Payment table:', err);
  });

module.exports = Payment;
