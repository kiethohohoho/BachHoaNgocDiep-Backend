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
    ShopBankNumber: {
      type: DataTypes.STRING,
    },
    UserBankNumber: {
      type: DataTypes.STRING,
    },
    ShopBankName: {
      type: DataTypes.STRING,
    },
    UserBankName: {
      type: DataTypes.STRING,
    },
    TransferContent: {
      type: DataTypes.STRING,
    },
    FullAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ReceiverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ReceiverPhoneNumber: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    TotalAmount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 1 - 2 - 3 - 4
    StatusCode: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
    },
    // Đang kiểm tra - Đang chuẩn bị - Đang giao hàng - Đã giao hàng
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Đang kiểm tra',
    },
    DeliveryDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '',
    },
    Notes: {
      type: DataTypes.TEXT('long'),
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

Order.sync({ force: false })
  .then(() => {
    loggers.info('Order table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Order table:', err);
  });

module.exports = Order;
