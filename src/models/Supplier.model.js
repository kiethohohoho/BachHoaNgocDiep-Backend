const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');

const Supplier = sequelize.define(
  'user',
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
    description: {
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

Supplier.sync({ force: true })
  .then(() => {
    loggers.info('Supplier table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Supplier table:', err);
  });

module.exports = Supplier;
