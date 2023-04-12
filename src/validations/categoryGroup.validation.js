const Joi = require('joi');

const getCategoryGroups = {
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

const getOrDeleteCategoryGroupById = {
  params: Joi.object()
    .keys({
      categoryGroupId: Joi.string().required(),
    })
    .unknown(true),
};

const updateCategoryGroupById = {
  params: Joi.object()
    .keys({
      categoryGroupId: Joi.string().required(),
    })
    .unknown(true),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
  }),
};

const createCategoryGroup = {
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
    })
    .unknown(true),
};

module.exports = {
  getCategoryGroups,
  getOrDeleteCategoryGroupById,
  updateCategoryGroupById,
  createCategoryGroup,
};
