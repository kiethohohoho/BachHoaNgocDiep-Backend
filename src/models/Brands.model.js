const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');

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
    BrandName: {
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
    },
    underscored: false,
    paranoid: true,
  }
);

Brand.sync({ force: false })
  .then(() => {
    loggers.info('Brand table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Brand table:', err);
  });

module.exports = Brand;
