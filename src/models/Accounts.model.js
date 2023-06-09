const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');

const Account = sequelize.define(
  'Accounts',
  {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DateOfBirth: {
      type: DataTypes.DATE,
    },
    Gender: {
      type: DataTypes.BOOLEAN,
    },
    PhoneNumber: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserName: {
      type: DataTypes.STRING,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AccumulatedPoints: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    Avatar: {
      type: DataTypes.STRING,
    },
    IsAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    IsEmailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    OTPPhoneVerified: {
      type: DataTypes.STRING,
    },
    IsPhoneVerified: {
      type: DataTypes.BOOLEAN,
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

Account.sync({ force: false })
  .then(() => {
    loggers.info('Account table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Account table:', err);
  });

module.exports = Account;
