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

const getProductById = {
  params: Joi.object()
    .keys({
      productId: Joi.string().required(),
    })
    .unknown(true),
};

const createProduct = {
  body: Joi.object()
    .keys({
      brandId: Joi.string().required(),
      categoryId: Joi.string().required(),
      categoryGroupId: Joi.string().required(),
      couponId: Joi.string(),
      name: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string(),
    })
    .unknown(true),
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};
