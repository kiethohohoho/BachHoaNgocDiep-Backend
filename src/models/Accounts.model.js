const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const Address = require('./Address.model');
const sequelize = require('../config/database');
const { env } = require('../config/config');

const Account = sequelize.define(
  'Accounts',
  {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // AvatarId: {
    //   type: DataTypes.UUID,
    //   references: {
    //     model: 'File',
    //     key: 'Id',
    //   },
    // },
    FistName: {
      type: DataTypes.STRING,
      // allowNull: false,
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
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IsAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: {
      createdAt: 'CreatedAt',
      updatedAt: 'UpdatedAt',
    },
    underscored: false,
  }
);

Account.hasMany(Address, {
  foreignKey: 'AccountId',
  references: {
    model: Address,
    key: 'Id',
  },
});

if (env !== 'production') {
  // Development or test environment
  Account.sync({ force: true })
    .then(() => {
      loggers.info('Account table created successfully');
    })
    .catch((err) => {
      loggers.error('Error creating Account table:', err);
    });
} else {
  // Production environment
  Account.sync()
    .then(() => {
      loggers.info('Account table created successfully');
    })
    .catch((err) => {
      loggers.error('Error creating Account table:', err);
    });
}

module.exports = Account;
