/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const { Order, Category, Product, Cart, OrderDetails } = require('../models');
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
 * @param {Object} user - user
 * @returns {Promise<CreateResult>}
 */
const createOneOrder = async (body, user) => {
  const { address, shippingcost, data, notes } = body;
  const VAT = (data.TotalPrice * 1) / 100;
  const TotalAmount = data.TotalPrice + VAT + shippingcost;

  const [newOrder, carts] = await Promise.all([
    Order.create({
      AccountId: user.Id,
      FullAddress: address.FullAddress,
      ReceiverName: address.ReceiverName,
      ReceiverPhoneNumber: address.ReceiverPhoneNumber,
      SubAmount: data.TotalPrice,
      ShippingCost: shippingcost,
      VAT: 1,
      TotalAmount,
      Notes: notes,
    }),
    Cart.findAll({ where: { AccountId: user.Id } }),
  ]);
  if (newOrder) {
    await Promise.all([
      ...data.map((prd) =>
        Product.update(
          { Quantity: prd.Product.Quantity - 1 },
          {
            where: {
              Id: prd.Id,
            },
          }
        )
      ),
      ...data.map((prd) =>
        OrderDetails.create({
          OrderId: newOrder.Id,
          ProductId: prd.Product.Id,
          ProductName: prd.Product.Quantity,
          ProductImageURL: prd.Product.ImageURL,
          ProductPrice: prd.Product.Price,
          BuyingQuantity: prd.Quantity,
          Amount: prd.Product.Price * prd.Quantity,
        })
      ),
      ...carts.map((cart) => cart.destroy()),
    ]);
    return newOrder;
  }
};

module.exports = {
  queryOrders,
  queryOrderById,
  saveOrder,
  destroyOrder,
  createOneOrder,
};
