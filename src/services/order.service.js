/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const { Order, Category } = require('../models');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');

/**
 * Query for orders
 * @param {Object} query - Request query
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async (query) => {
  const orders = await paginate(Order, query);
  return orders;
};

/**
 * Query for one order by Id
 * @param {Object} params - Request params
 * @returns {Promise<QueryResult>}
 */
const queryOrderById = async (orderId) => {
  const order = await Order.findByPk(orderId, {
    include: [Category, Order],
  });
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Nhóm danh mục không tồn tại!');
  }
  return order;
};

/**
 * Change record value and save
 * @param {Order} order - order record
 * @param {Object} body - Request body
 * @returns {Promise<SaveResult>}
 */
const saveOrder = async (order, body) => {
  const { name, description } = body;
  if (name) {
    order.Name = name;
  }
  if (description) {
    order.Description = description;
  }
  await order.save();
};

/**
 * Destroy a record
 * @param {Order} order - order record
 * @returns {Promise<DestroyResult>}
 */
const destroyOrder = async (order) => {
  await order.destroy();
};

/**
 * Create one order
 * @param {Object} body - Request body
 * @returns {Promise<CreateResult>}
 */
const createOneOrder = async (body) => {
  const { name, description } = body;

  if (name) {
    const existOrder = await Order.findOne({
      where: { Name: name },
    });
    if (existOrder) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Nhóm danh mục này đã tồn tại!');
    }
  }

  const newOrder = await Order.create({
    Name: name,
    Description: description,
  });
  return newOrder;
};

module.exports = {
  queryOrders,
  queryOrderById,
  saveOrder,
  destroyOrder,
  createOneOrder,
};
