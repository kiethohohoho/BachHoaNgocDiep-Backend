const Joi = require('joi');

const getReviews = {
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

const getReviewByProduct = {
  params: Joi.object()
    .keys({
      productId: Joi.string().required(),
    })
    .unknown(true),
};

const getOrDeleteReviewById = {
  params: Joi.object()
    .keys({
      reviewId: Joi.string().required(),
    })
    .unknown(true),
};

const updateReviewById = {
  params: Joi.object()
    .keys({
      reviewId: Joi.string().required(),
    })
    .unknown(true),
  body: Joi.object().keys({
    content: Joi.string(),
    rate: Joi.number(),
  }),
};

const createReview = {
  body: Joi.object()
    .keys({
      productid: Joi.string().required(),
      content: Joi.string().required(),
      rate: Joi.number().required(),
    })
    .unknown(true),
};

module.exports = {
  getReviews,
  getReviewByProduct,
  getOrDeleteReviewById,
  updateReviewById,
  createReview,
};
