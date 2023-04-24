const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');

const Order = sequelize.define(
  'Orders',
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
    FullAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Notes: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    TotalAmount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    StatusCode: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    // 1 - 2 - 3 - 4
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 1,
    },
    // Đang kiểm tra - Đang chuẩn bị - Đang giao hàng - Đã giao hàng
    DeliveryDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '',
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

Order.sync({ force: true })
  .then(() => {
    loggers.info('Order table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Order table:', err);
  });

module.exports = Order;
