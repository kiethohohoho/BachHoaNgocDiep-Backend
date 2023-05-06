const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');
const { Product, Account } = require('.');

const Review = sequelize.define(
  'Reviews',
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
    ProductId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    Content: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    Rate: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    Like: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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

Review.belongsTo(Product, {
  foreignKey: 'ProductId',
  targetKey: 'Id',
});

Review.belongsTo(Account, {
  foreignKey: 'AccountId',
  targetKey: 'Id',
});

Review.sync({ force: false })
  .then(() => {
    loggers.info('Review table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Review table:', err);
  });

module.exports = Review;
