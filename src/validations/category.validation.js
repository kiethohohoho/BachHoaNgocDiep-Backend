const Joi = require('joi');

const getCategories = {
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

const getCategoryByCategoryGroupId = {
  params: Joi.object()
    .keys({
      categoryGroupId: Joi.string().required(),
    })
    .unknown(true),
};

const deleteCategoryById = {
  params: Joi.object()
    .keys({
      categoryId: Joi.string().required(),
    })
    .unknown(true),
};

const updateCategoryById = {
  params: Joi.object()
    .keys({
      categoryId: Joi.string().required(),
    })
    .unknown(true),
  body: Joi.object().keys({
    categorygroupid: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
  }),
};

const createCategory = {
  body: Joi.object()
    .keys({
      categorygroupid: Joi.string(),
      name: Joi.string(),
      description: Joi.string(),
    })
    .unknown(true),
};

module.exports = {
  getCategories,
  getCategoryByCategoryGroupId,
  deleteCategoryById,
  updateCategoryById,
  createCategory,
};
