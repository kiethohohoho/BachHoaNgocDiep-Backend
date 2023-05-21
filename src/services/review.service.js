/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const { Review, Account, Product, OrderDetail } = require('../models');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');
const { queryProductById, saveProduct } = require('./product.service');
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
  const {
    // userId,
    productId,
    query,
  } = body;

  const [
    reviews,
    usersWhoBought,
    reviewOneStar,
    reviewTwoStar,
    reviewThreeStar,
    reviewFourStar,
    reviewFiveStar,
  ] = await Promise.all([
    paginate(
      Review,
      {
        ...query,
        filter: {
          // AccountId: {
          //   eq: userId,
          // },
          ProductId: {
            eq: productId,
          },
        },
      },
      [{ model: Account }]
    ),
    OrderDetail.findAll({ where: { ProductId: productId } }),
    Review.count({ where: { ProductId: productId, Rate: 1 } }),
    Review.count({ where: { ProductId: productId, Rate: 2 } }),
    Review.count({ where: { ProductId: productId, Rate: 3 } }),
    Review.count({ where: { ProductId: productId, Rate: 4 } }),
    Review.count({ where: { ProductId: productId, Rate: 5 } }),
  ]);
  if (!reviews.Data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Đã có lỗi xảy ra!');
  }
  const customReviews = reviews.Data.map((review) => ({
    ...review,
    IsPurchased: usersWhoBought.map((obj) => obj.AccountId).includes(review.AccountId),
  }));
  const ratings = [
    {
      name: '1 Star',
      reviewCount: reviewOneStar,
    },
    {
      name: '2 Stars',
      reviewCount: reviewTwoStar,
    },
    {
      name: '3 Stars',
      reviewCount: reviewThreeStar,
    },
    {
      name: '4 Stars',
      reviewCount: reviewFourStar,
    },
    {
      name: '5 Stars',
      reviewCount: reviewFiveStar,
    },
  ];

  return { reviews: customReviews, ratings };
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

  const { originalProduct: product, count } = await queryProductById(productid);

  const newRate = (product.Rate * count + rate) / (count + 1);

  // eslint-disable-next-line no-unused-vars
  const [newReview, save] = await Promise.all([
    Review.create({
      AccountId: userId,
      ProductId: productid,
      Content: content,
      Rate: rate,
    }),
    saveProduct(product, { rate: newRate }),
  ]);

  return {
    Review: newReview.get({ plain: true }),
    Rate: newRate,
  };
};

module.exports = {
  queryReviews,
  queryReviewById,
  queryReviewsByProduct,
  saveReview,
  destroyReview,
  createOneReview,
};
