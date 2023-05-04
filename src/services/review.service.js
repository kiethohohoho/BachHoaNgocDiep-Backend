/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const { Review, Account, Product } = require('../models');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');
// const logger = require('../config/logger');

/**
 * Query for reviews
 * @param {Object} query - Request query
 * @returns {Promise<QueryResult>}
 */
const queryReviews = async (query) => {
  const reviews = await paginate(Review, query, [{ model: Account }]);
  return reviews;
};

/**
 * Query for one review by Id
 * @param {string} reviewId - reviewId
 * @returns {Promise<QueryResult>}
 */
const queryReviewById = async (reviewId) => {
  const review = await Review.findByPk(reviewId, {
    include: [Account, Product],
  });
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review không tồn tại!');
  }
  return review;
};

/**
 * Query for all reviews by Product Id
 * @param { {userId: string; productid: string }} body
 * @returns {Promise<QueryResult>}
 */
const queryReviewsByProduct = async (body) => {
  const { userId, productId } = body;
  const reviews = await Review.findAll({
    where: { AccountId: userId, ProductId: productId },
    include: [Account, Product],
  });
  if (!reviews) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review không tồn tại!');
  }
  return reviews;
};

/**
 * Change record value and save
 * @param {Review} review - review record
 * @param {Object} body - Request body
 * @returns {Promise<SaveResult>}
 */
const saveReview = async (review, body) => {
  const { content, rate } = body;
  if (content) {
    review.Content = content;
  }
  if (rate) {
    review.Rate = rate;
  }
  await review.save();
};

/**
 * Destroy a record
 * @param {Review} review - review record
 * @returns {Promise<DestroyResult>}
 */
const destroyReview = async (review) => {
  await review.destroy();
};

/**
 * Create one review
 * @param {Object} body - Request body
 * @returns {Promise<CreateResult>}
 */
const createOneReview = async (body) => {
  const { userId, productid, content, rate } = body;

  const newReview = await Review.create({
    AccountId: userId,
    ProductId: productid,
    Content: content,
    Rate: rate,
  });
  return newReview.get({ plain: true });
};

module.exports = {
  queryReviews,
  queryReviewById,
  queryReviewsByProduct,
  saveReview,
  destroyReview,
  createOneReview,
};
