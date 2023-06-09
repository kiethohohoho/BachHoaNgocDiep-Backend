/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const he = require('he');
const { Order, Product, Cart, OrderDetail } = require('../models');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');

/**
 * Query for orders
 * @param {Object} query - Request query
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async (query) => {
  const orders = await paginate(
    Order,
    query.user.IsAdmin
      ? query
      : {
          ...query,
          filter: {
            AccountId: {
              eq: query.user.Id,
            },
          },
        }
  );
  return orders;
};

/**
 * Query for one order by Id
 * @param {Object} params - Request params
 * @returns {Promise<QueryResult>}
 */
const queryOrderById = async (orderId) => {
  const [order, carts] = await Promise.all([
    Order.findByPk(orderId),
    OrderDetail.findAll({ where: { OrderId: orderId }, include: [Product] }),
  ]);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Đơn hàng không tồn tại!');
  }
  const customCarts = carts.map((cart) => {
    // Clone the objects and remove circular references
    const clonedCart = JSON.parse(JSON.stringify(cart));
    const clonedProduct = JSON.parse(JSON.stringify(cart.Product));
    // Decode the description
    clonedProduct.Description = he.decode(clonedProduct.Description);
    clonedCart.Product = clonedProduct;
    return clonedCart;
  });
  return {
    order,
    carts: customCarts,
  };
};

/**
 * Change record value and save
 * @param {Order} order - order record
 * @param {Object} body - Request body
 * @returns {Promise<SaveResult>}
 */
const saveOrder = async (order, body) => {
  const { statuscode } = body;
  switch (statuscode) {
    case 1:
      order.StatusCode = 1;
      order.Status = 'Đang chờ duyệt';
      break;

    case 2:
      order.StatusCode = 2;
      order.Status = 'Đã duyệt';
      break;

    case 3:
      order.StatusCode = 3;
      order.Status = 'Đang giao hàng';
      break;

    case 4:
      order.StatusCode = 4;
      order.Status = 'Hoàn thành';
      break;

    case 5:
      order.StatusCode = 5;
      order.Status = 'Hủy';
      break;

    default:
      break;
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
  const { address, totalprice, shippingcost, data, paidtype, notes } = body;
  const { City, District, Ward, Street, ReceiverName, ReceiverPhoneNumber } = address;
  const VAT = (totalprice * 1) / 100;
  const TotalAmount = totalprice + VAT + shippingcost;
  const count = await Order.count();

  const [newOrder, carts] = await Promise.all([
    Order.create({
      AccountId: user.Id,
      InvoiceNumber: `INV-${Date.now()}-${count}`,
      FullAddress: `${Street}, ${Ward}, ${District}, ${City}`,
      ReceiverName,
      ReceiverPhoneNumber,
      SubAmount: totalprice,
      ShippingCost: shippingcost,
      VAT: 1,
      TotalAmount,
      PaidType: paidtype,
      Notes: notes,
    }),
    Cart.findAll({ where: { AccountId: user.Id } }),
  ]);
  if (newOrder) {
    await Promise.all([
      ...data.map((prd) =>
        Product.update(
          { Quantity: prd.Product.Quantity * 1 - prd.Quantity * 1 },
          {
            where: {
              Id: prd.Product.Id,
            },
          }
        )
      ),
      ...data.map((prd) =>
        OrderDetail.create({
          OrderId: newOrder.Id,
          ProductId: prd.Product.Id,
          AccountId: user.Id,
          ProductName: prd.Product.Name,
          ProductImageURL: prd.Product.ImageURL,
          ProductPrice: prd.Product.Price,
          BuyingQuantity: prd.Quantity,
          Amount: prd.SubTotal,
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
