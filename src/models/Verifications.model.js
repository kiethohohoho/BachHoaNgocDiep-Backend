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
    EmailCode: {
      type: DataTypes.STRING,
    },
    Otp: {
      type: DataTypes.STRING,
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
