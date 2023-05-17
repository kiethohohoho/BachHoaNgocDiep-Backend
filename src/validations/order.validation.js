const Joi = require('joi');

const getOrders = {
  query: Joi.object()
    .keys({
      search: Joi.string(),
      filter: Joi.object(),
      sort: Joi.string(),
      order: Joi.string(),
      page: Joi.number().integer().min(1),
      limit: Joi.number().integer().min(1),
    })
    .unknown(true),
};

const getOrDeleteOrderById = {
  params: Joi.object()
    .keys({
      orderId: Joi.string().required(),
    })
    .unknown(true),
};

const updateOrderById = {
  params: Joi.object()
    .keys({
      orderId: Joi.string().required(),
    })
    .unknown(true),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
  }),
};

const createOrder = {
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
    })
    .unknown(true),
};

module.exports = {
  getOrders,
  getOrDeleteOrderById,
  updateOrderById,
  createOrder,
};
