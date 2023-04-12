const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');
const Category = require('./Categories.model');
const CategoryGroup = require('./CategoryGroups.model');

const Brand = sequelize.define(
  'Brands',
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
    CategoryId: {
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

Brand.belongsTo(Category, {
  foreignKey: 'CategoryId',
  targetKey: 'Id',
});
Brand.belongsTo(CategoryGroup, {
  foreignKey: 'CategoryGroupId',
  targetKey: 'Id',
});

Brand.sync({ force: false })
  .then(() => {
    loggers.info('Brand table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Brand table:', err);
  });

module.exports = Brand;
