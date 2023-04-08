const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');
const Brand = require('./Brands.model');
const Category = require('./Categories.model');
const CategoryGroup = require('./CategoryGroups.model');

const Product = sequelize.define(
  'Products',
  {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    BrandId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    CategoryId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    CategoryGroupId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT('long'),
    },
    Price: {
      type: DataTypes.DECIMAL,
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

Product.belongsTo(Brand, {
  foreignKey: 'BrandId',
  targetKey: 'Id',
});
Product.belongsTo(Category, {
  foreignKey: 'CategoryId',
  targetKey: 'Id',
});
Product.belongsTo(CategoryGroup, {
  foreignKey: 'CategoryGroupId',
  targetKey: 'Id',
});

Product.sync({ force: false })
  .then(() => {
    loggers.info('Product table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Product table:', err);
  });

module.exports = Product;
