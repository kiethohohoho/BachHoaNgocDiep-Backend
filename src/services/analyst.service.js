/* eslint-disable no-param-reassign */
// const httpStatus = require('http-status');
const { Op, fn, col } = require('sequelize');
const { Order, OrderDetail, Product } = require('../models');
// const ApiError = require('../utils/ApiError');

/**
 * Get Revenue
//  * @param {string} period - period: 'day' | 'week' | 'mounth'
 * @returns {Promise<QueryResult>}
 */
const getRevenue = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [revenueToday, revenueThisWeek, revenueThisMonth] = await Promise.all([
    Order.sum('TotalAmount', {
      where: {
        createdAt: {
          [Op.gte]: today,
        },
      },
    }),
    Order.sum('TotalAmount', {
      where: {
        createdAt: {
          [Op.gte]: startOfWeek,
        },
      },
    }),
    Order.sum('TotalAmount', {
      where: {
        createdAt: {
          [Op.gte]: startOfMonth,
        },
      },
    }),
  ]);

  return { revenueToday, revenueThisWeek, revenueThisMonth };
};

/**
 * Get Sale Product Today
 * @returns {Promise<QueryResult>}
 */
const getSaleProductToday = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const [revenueToday, revenueYesterday] = await Promise.all([
    OrderDetail.sum('BuyingQuantity', {
      where: {
        createdAt: {
          [Op.gte]: today,
        },
      },
    }),
    OrderDetail.sum('BuyingQuantity', {
      where: {
        createdAt: {
          [Op.gte]: yesterday,
          [Op.lt]: today,
        },
      },
    }),
  ]);

  return { revenueToday, revenueYesterday };
};

/**
 * Get Order Today
 * @returns {Promise<QueryResult>}
 */
const getAmountByPaidType = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [amountByCash, amountByTransfer] = await Promise.all([
    Order.sum('TotalAmount', {
      where: {
        PaidType: {
          [Op.eq]: 'cash',
        },
        createdAt: {
          [Op.gte]: today,
        },
      },
    }),
    Order.sum('TotalAmount', {
      where: {
        PaidType: {
          [Op.eq]: 'transfer',
        },
        createdAt: {
          [Op.gte]: today,
        },
      },
    }),
  ]);

  return { amountByCash, amountByTransfer };
};

/**
 * Get Order Today
 * @returns {Promise<QueryResult>}
 */
const getThreeBestSellingProducts = async () => {
  const [allProductsCount, bestSellingProducts] = await Promise.all([
    OrderDetail.count(),
    OrderDetail.findAll({
      attributes: [
        'OrderDetails.Id',
        'ProductId',
        [fn('SUM', col('BuyingQuantity')), 'TotalSales'],
      ],
      limit: 3,
      include: [
        {
          model: Product,
          attributes: ['Name'],
        },
      ],
      group: ['ProductId', 'Product.Name', 'OrderDetails.Id', 'Product.Id'],
      order: [['TotalSales', 'DESC']],
    }),
  ]);

  return { allProductsCount, bestSellingProducts };
};

module.exports = {
  getRevenue,
  getSaleProductToday,
  getAmountByPaidType,
  getThreeBestSellingProducts,
};
