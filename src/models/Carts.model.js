const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');
const Account = require('./Accounts.model');
const Product = require('./Products.model');

const Cart = sequelize.define(
  'Carts',
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
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    SubTotal: {
      type: DataTypes.BIGINT,
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

Cart.belongsTo(Account, {
  foreignKey: 'AccountId',
  targetKey: 'Id',
});
Cart.belongsTo(Product, {
  foreignKey: 'ProductId',
  targetKey: 'Id',
});

Cart.sync({ force: false })
  .then(() => {
    loggers.info('Cart table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Cart table:', err);
  });

module.exports = Cart;
