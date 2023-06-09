const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');
const CategoryGroup = require('./CategoryGroups.model');

const Category = sequelize.define(
  'Categories',
  {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    CategoryGroupId: {
      type: DataTypes.UUID,
      allowNull: false,
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

Category.belongsTo(CategoryGroup, {
  foreignKey: 'CategoryGroupId',
  targetKey: 'Id',
});

Category.sync({ force: false })
  .then(() => {
    loggers.info('Category table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Category table:', err);
  });

module.exports = Category;
