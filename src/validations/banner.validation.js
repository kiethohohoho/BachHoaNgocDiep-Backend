const Joi = require('joi');

const getBanners = {
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

const getOrDeleteBannerById = {
  params: Joi.object()
    .keys({
      bannerId: Joi.string().required(),
    })
    .unknown(true),
};

const updateBannerById = {
  params: Joi.object()
    .keys({
      bannerId: Joi.string().required(),
    })
    .unknown(true),
  body: Joi.object().keys({
    title: Joi.string(),
    type: Joi.string(),
    description: Joi.string(),
    redirecturl: Joi.string(),
    images: Joi.array(),
  }),
};

const createBanner = {
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      type: Joi.string().required(),
      description: Joi.string(),
      redirecturl: Joi.string().required(),
      images: Joi.array().min(1).required(),
    })
    .unknown(true),
};

module.exports = {
  getBanners,
  getOrDeleteBannerById,
  updateBannerById,
  createBanner,
};
