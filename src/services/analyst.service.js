/* eslint-disable no-param-reassign */
// const httpStatus = require('http-status');
const { Op } = require('sequelize');
const { Order } = require('../models');
// const ApiError = require('../utils/ApiError');

/**
 * Get Revenue by period
//  * @param {string} period - period: 'day' | 'week' | 'mounth'
 * @returns {Promise<QueryResult>}
 */
const getRevenueByPeriod = async () => {
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

module.exports = {
  getRevenueByPeriod,
};
