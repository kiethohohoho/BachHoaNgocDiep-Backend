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
    },
    CategoryId: {
      type: DataTypes.UUID,
    },
    CategoryGroupId: {
      type: DataTypes.UUID,
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
    Rate: {
      type: DataTypes.DECIMAL,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Status: {
      type: DataTypes.BOOLEAN,
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
