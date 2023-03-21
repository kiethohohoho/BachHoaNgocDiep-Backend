const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');

const Shipper = sequelize.define(
  'Shippers',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    addressId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tenantId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
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

Shipper.sync({ force: true })
  .then(() => {
    loggers.info('Shipper table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Shipper table:', err);
  });

module.exports = Shipper;
