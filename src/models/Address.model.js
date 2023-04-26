const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');
const Account = require('./Accounts.model');

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
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IsDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    City: {
      type: DataTypes.STRING,
    },
    CityGHNId: {
      type: DataTypes.INTEGER,
    },
    District: {
      type: DataTypes.STRING,
    },
    DistrictGHNId: {
      type: DataTypes.INTEGER,
    },
    Ward: {
      type: DataTypes.STRING,
    },
    WardGHNId: {
      type: DataTypes.INTEGER,
    },
    Street: {
      type: DataTypes.STRING,
    },
    ReceiverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ReceiverPhoneNumber: {
      type: DataTypes.STRING(11),
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

Address.belongsTo(Account, {
  foreignKey: 'AccountId',
  targetKey: 'Id',
});

Address.sync({ force: false })
  .then(() => {
    loggers.info('Address table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Address table:', err);
  });

module.exports = Address;
