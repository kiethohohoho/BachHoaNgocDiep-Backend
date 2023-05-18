const { DataTypes } = require('sequelize');
const loggers = require('../config/logger');
const sequelize = require('../config/database');
const Account = require('./Accounts.model');

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
    SubAmount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    ShippingCost: {
      type: DataTypes.BIGINT,
    },
    VAT: {
      type: DataTypes.SMALLINT,
      defaultValue: 1,
    },
    TotalAmount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    PaidType: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // 1 - 2 - 3 - 4 - 5
    StatusCode: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
    },
    // Đang chờ duyệt - Đã duyệt - Đang giao hàng - Hoàn thành - Hủy
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Đang chờ duyệt',
    },
    DeliveryDate: {
      type: DataTypes.DATE,
    },
    Notes: {
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

Order.belongsTo(Account, {
  foreignKey: 'AccountId',
  targetKey: 'Id',
});

Order.sync({ force: false })
  .then(() => {
    loggers.info('Order table created successfully');
  })
  .catch((err) => {
    loggers.error('Error creating Order table:', err);
  });

module.exports = Order;
