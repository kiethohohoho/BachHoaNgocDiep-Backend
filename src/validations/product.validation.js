const Joi = require('joi');

const getProducts = {
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

const getOrDeleteProductById = {
  params: Joi.object()
    .keys({
      productId: Joi.string().required(),
    })
    .unknown(true),
};

const updateProductById = {
  params: Joi.object()
    .keys({
      productId: Joi.string().required(),
    })
    .unknown(true),
  body: Joi.object().keys({
    brandid: Joi.string(),
    categoryid: Joi.string(),
    categorygroupid: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    rate: Joi.number().min(0).max(5),
    quantity: Joi.number().min(0),
    images: Joi.array(),
    isbestseller: Joi.boolean,
  }),
};

const createProduct = {
  body: Joi.object()
    .keys({
      brandid: Joi.string().required(),
      categoryid: Joi.string(),
      categorygroupid: Joi.string(),
      name: Joi.string().required(),
      description: Joi.string(),
      price: Joi.number().required(),
      rate: Joi.number().min(0).max(5),
      quantity: Joi.number().min(0).required(),
      images: Joi.array().min(1).required(),
      isbestseller: Joi.boolean(),
    })
    .unknown(true),
};

module.exports = {
  getProducts,
  getOrDeleteProductById,
  updateProductById,
  createProduct,
};
