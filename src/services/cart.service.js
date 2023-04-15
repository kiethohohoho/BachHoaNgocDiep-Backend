/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const { Cart, Product } = require('../models');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');
// const logger = require('../config/logger');

/**
 * Query for carts
 * @param {Object} query - Request query
 * @returns {Promise<QueryResult>}
 */
const queryCarts = async (query) => {
  const carts = await paginate(Cart, query);
  return carts;
};

/**
 * Query for one cart by Id
 * @param {string} cartId - cartId
 * @returns {Promise<QueryResult>}
 */
const queryCartById = async (cartId) => {
  const cart = await Cart.findByPk(cartId, {
    include: [Product],
  });
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Thương hiệu không tồn tại!');
  }
  return cart;
};

/**
 * Query for all cart by accountId
 * @param {string} accountId - accountId
 * @returns {Promise<QueryResult>}
 */
const queryCartsByAccountId = async (accountId) => {
  const carts = await Cart.findAll({
    where: { AccountId: accountId },
    include: [Product],
  });
  if (!carts) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Thương hiệu không tồn tại!');
  }
  return carts;
};

/**
 * Change record value and save
 * @param {Cart} cart - cart record
 * @param {Object} body - Request body
 * @returns {Promise<SaveResult>}
 */
const saveCart = async (cart, body) => {
  const { categoryid, categorygroupid, name, description } = body;
  if (categoryid) {
    cart.CategoryId = categoryid;
  }
  if (categorygroupid) {
    cart.CategoryGroupId = categorygroupid;
  }
  if (name) {
    cart.Name = name;
  }
  if (description) {
    cart.Description = description;
  }
  await cart.save();
};

/**
 * Destroy a record
 * @param {Cart} cart - cart record
 * @returns {Promise<DestroyResult>}
 */
const destroyCart = async (cart) => {
  await cart.destroy();
};

/**
 * Create one cart
 * @param {Object} body - Request body
 * @returns {Promise<CreateResult>}
 */
const createOneCart = async (body) => {
  const { categoryid, categorygroupid, name, description } = body;

  // await Cart.create({
  //   Id: cartid,
  //   CategoryId: categoryid,
  //   CategoryGroupId: categorygroupid,
  //   Name: 'test',
  // });
  // await Category.create({ Id: categoryid, CategoryGroupId: categorygroupid, Name: 'test' });
  // await CategoryGroup.create({ Id: categorygroupid, Name: 'test' });

  const newCart = await Cart.create({
    CategoryId: categoryid,
    CategoryGroupId: categorygroupid,
    Name: name,
    Description: description,
  });
  return newCart;
};

module.exports = {
  queryCarts,
  queryCartById,
  queryCartsByAccountId,
  saveCart,
  destroyCart,
  createOneCart,
};
