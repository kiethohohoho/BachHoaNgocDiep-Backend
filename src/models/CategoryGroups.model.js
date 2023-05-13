const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
// const Address = require('./Address.model');
const sequelize = require('../config/database');

const CategoryGroup = sequelize.define(
  'CategoryGroups',
  {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT('long'),
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

CategoryGroup.sync({ force: false })
  .then(() => {
    loggers.info('CategoryGroup table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating CategoryGroup table:', err);
  });

module.exports = CategoryGroup;
