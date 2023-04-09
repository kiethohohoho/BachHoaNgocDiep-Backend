const { DataTypes } = require('sequelize');
// const Account = require('./Accounts.model');
const loggers = require('../config/logger');
const sequelize = require('../config/database');
// const config = require('../config/config');

const Address = sequelize.define(
  'Addresses',
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
    City: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    District: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Ward: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    StayingAddress: {
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

// Address.belongsTo(Account, {
//   foreignKey: 'AccountId',
//   references: {
//     model: Account,
//     key: 'Id',
//   },
// });

// if (config.env !== 'production') {
//   // Development or test environment
//   Address.sync({ force: true })
//     .then(() => {
//       loggers.info('Address table created successfully');
//     })
//     .catch((err) => {
//       loggers.error('Error creating Address table:', err);
//     });
// } else {
//   // Production environment
//   Address.sync()
//     .then(() => {
//       loggers.info('Address table created successfully');
//     })
//     .catch((err) => {
//       loggers.error('Error creating Address table:', err);
//     });
// }

Address.sync()
  .then(() => {
    loggers.info('Address table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Address table:', err);
  });

module.exports = Address;
