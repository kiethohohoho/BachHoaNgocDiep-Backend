const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');
const Product = require('./Products.model');
const Order = require('./Orders.model');
const Account = require('./Accounts.model');

const OrderDetail = sequelize.define(
  'OrderDetails',
  {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    OrderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    ProductId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    AccountId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProductImageURL: {
      type: DataTypes.TEXT('long'),
    },
    ProductPrice: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    BuyingQuantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Amount: {
      type: DataTypes.STRING,
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

OrderDetail.belongsTo(Order, {
  foreignKey: 'OrderId',
  targetKey: 'Id',
});

OrderDetail.belongsTo(Product, {
  foreignKey: 'ProductId',
  targetKey: 'Id',
});

OrderDetail.belongsTo(Account, {
  foreignKey: 'AccountId',
  targetKey: 'Id',
});

OrderDetail.sync({ force: false })
  .then(() => {
    loggers.info('OrderDetail table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating OrderDetail table:', err);
  });

module.exports = OrderDetail;
