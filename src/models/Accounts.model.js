const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const loggers = require('../config/logger');
// const Address = require('./Address.model');
const sequelize = require('../config/database');
const config = require('../config/config');

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
    },
    underscored: false,
    paranoid: true,
  }
);

Account.prototype.isMatchPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Account.hasMany(Address, {
//   foreignKey: 'AccountId',
//   references: {
//     model: Account,
//     key: 'Id',
//   },
// });

if (config.env !== 'production') {
  // Development or test environment
  Account.sync({ force: false })
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
