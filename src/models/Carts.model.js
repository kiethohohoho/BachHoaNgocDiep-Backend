const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');

const Cart = sequelize.define(
  'Carts',
  {
    AccountId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    ProductId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    SubTotal: {
      type: DataTypes.DECIMAL(10, 3),
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

Cart.sync({ force: true })
  .then(() => {
    loggers.info('Cart table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Cart table:', err);
  });

module.exports = Cart;
