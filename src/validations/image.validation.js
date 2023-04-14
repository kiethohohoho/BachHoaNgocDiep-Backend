const Joi = require('joi');

const getImages = {
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

const getOrDeleteImageById = {
  params: Joi.object()
    .keys({
      imageId: Joi.string().required(),
    })
    .unknown(true),
};

const getImagesByProductIdy = {
  params: Joi.object()
    .keys({
      productId: Joi.string().required(),
    })
    .unknown(true),
};

const updateImageById = {
  params: Joi.object()
    .keys({
      imageId: Joi.string().required(),
    })
    .unknown(true),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
  }),
};

const uploadImage = {
  files: Joi.array().items(Joi.any()),
};

module.exports = {
  getImages,
  getOrDeleteImageById,
  getImagesByProductIdy,
  updateImageById,
  uploadImage,
};
