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
  const carts = await paginate(
    Cart,
    {
      ...query,
      filter: {
        AccountId: {
          eq: query.user.Id,
        },
      },
    },
    [{ model: Product }]
  );
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
    throw new ApiError(httpStatus.NOT_FOUND, 'Giỏ hàng không tồn tại!');
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
    throw new ApiError(httpStatus.NOT_FOUND, 'Giỏ hàng không tồn tại!');
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
  const { productid, quantity } = body;
  // if (accountid) {
  //   cart.AccountId = accountid;
  // }
  if (productid) {
    cart.ProductId = productid;
  }
  if (quantity) {
    cart.Quantity = quantity;
    cart.SubTotal = quantity * cart.Product.Price;
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
  const { productid, quantity, user } = body;

  const product = await Product.findByPk(productid);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sản phẩm không tồn tại!');
  }

  const cart = await Cart.findOne({
    where: {
      AccountId: user.Id,
      ProductId: productid,
    },
  });

  if (!cart) {
    await Cart.create({
      AccountId: user.Id,
      ProductId: productid,
      Quantity: quantity,
      SubTotal: quantity * product.Price,
    });
  } else {
    cart.Quantity += quantity;
    cart.SubTotal = cart.SubTotal * 1 + quantity * product.Price;
    await cart.save();
  }
};

module.exports = {
  queryCarts,
  queryCartById,
  queryCartsByAccountId,
  saveCart,
  destroyCart,
  createOneCart,
};
