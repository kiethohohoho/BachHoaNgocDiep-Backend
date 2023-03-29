const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const loggers = require('../config/logger');
// const Address = require('./Address.model');
const sequelize = require('../config/database');
const config = require('../config/config');

const Verification = sequelize.define(
  'Verifications',
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
    IsEmailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
  }
);

Verification.prototype.isMatchPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

if (config.env !== 'production') {
  // Development or test environment
  Verification.sync({ force: true })
    .then(() => {
      loggers.info('Verification table created successfully');
    })
    .catch((err) => {
      loggers.error('Error creating Verification table:', err);
    });
} else {
  // Production environment
  Verification.sync()
    .then(() => {
      loggers.info('Verification table created successfully');
    })
    .catch((err) => {
      loggers.error('Error creating Verification table:', err);
    });
}

module.exports = Verification;
