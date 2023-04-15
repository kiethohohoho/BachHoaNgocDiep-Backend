const Joi = require('joi');

const getBrands = {
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

const getOrDeleteBrandById = {
  params: Joi.object()
    .keys({
      brandId: Joi.string().required(),
    })
    .unknown(true),
};

const getBrandsByCategoryId = {
  params: Joi.object()
    .keys({
      categoryId: Joi.string().required(),
    })
    .unknown(true),
};

const updateBrandById = {
  params: Joi.object()
    .keys({
      brandId: Joi.string().required(),
    })
    .unknown(true),
  body: Joi.object().keys({
    categoryid: Joi.string(),
    categorygroupid: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
  }),
};

const createBrand = {
  body: Joi.object()
    .keys({
      categoryid: Joi.string(),
      categorygroupid: Joi.string(),
      name: Joi.string(),
      description: Joi.string(),
    })
    .unknown(true),
};

module.exports = {
  getBrands,
  getOrDeleteBrandById,
  getBrandsByCategoryId,
  updateBrandById,
  createBrand,
};
