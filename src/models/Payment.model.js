const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');
const { Account } = require('.');

const Payment = sequelize.define(
  'Payments',
  {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    AccountId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    CardNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    OwnerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BankName: {
      type: DataTypes.STRING,
      allowNull: false,
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

Payment.belongsTo(Account, {
  foreignKey: 'AccountId',
  targetKey: 'Id',
});

Payment.sync({ force: false })
  .then(() => {
    loggers.info('Payment table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Payment table:', err);
  });

module.exports = Payment;
