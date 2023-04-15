const Joi = require('joi');

const getCarts = {
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

const getOrDeleteCartById = {
  params: Joi.object()
    .keys({
      cartId: Joi.string().required(),
    })
    .unknown(true),
};

const getCartsByAccountId = {
  params: Joi.object()
    .keys({
      accountId: Joi.string().required(),
    })
    .unknown(true),
};

const updateCartById = {
  params: Joi.object()
    .keys({
      cartId: Joi.string().required(),
    })
    .unknown(true),
  body: Joi.object().keys({
    categoryid: Joi.string(),
    categorygroupid: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
  }),
};

const createCart = {
  body: Joi.object()
    .keys({
      productid: Joi.string().required(),
      quantity: Joi.string().required(),
    })
    .unknown(true),
};

module.exports = {
  getCarts,
  getOrDeleteCartById,
  getCartsByAccountId,
  updateCartById,
  createCart,
};
