const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');

const Transaction = sequelize.define(
  'Transactions',
  {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    timestamps: {
      CreatedAt: 'created_date',
      UpdatedAt: 'updated_at',
      DeletedAt: 'deleted_at',
    },
    underscored: false,
    paranoid: true,
  }
);

Transaction.sync({ force: true })
  .then(() => {
    loggers.info('Transaction table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Transaction table:', err);
  });

module.exports = Transaction;
