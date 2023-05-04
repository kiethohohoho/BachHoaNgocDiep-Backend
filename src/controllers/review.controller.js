const httpStatus = require('http-status');
const {
  queryReviews,
  queryReviewById,
  createOneReview,
  saveReview,
  destroyReview,
  queryReviewsByProduct,
} = require('../services/review.service');
const catchAsync = require('../utils/catchAsync');
const { queryProductById, saveProduct } = require('../services/product.service');
const { Review } = require('../models');

const getReviews = catchAsync(async (req, res) => {
  try {
    const Reviews = await queryReviews(req.query);
    res.status(httpStatus.OK).json({ Reviews, success: true });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi lấy danh sách review!',
      detail: error.message || error,
      success: false,
    });
  }
});

const getReviewById = async (req, res) => {
  try {
    const review = await queryReviewById(req.params.reviewId);
    return res.status(httpStatus.OK).json({ review, success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm review!',
      detail: err.message || err,
      success: false,
    });
  }
};

const getReviewByProduct = async (req, res) => {
  try {
    const review = await queryReviewsByProduct({
      userId: req.user.Id,
      productId: req.params.productId,
    });
    return res.status(httpStatus.OK).json({ review, success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm review!',
      detail: err.message || err,
      success: false,
    });
  }
};

const updateReviewById = async (req, res) => {
  try {
    const review = await queryReviewById(req.params.reviewId);
    await saveReview(review, req.body);

    return res.status(httpStatus.OK).json({ message: 'Cập nhật thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm review!',
      detail: err.message || err,
      success: false,
    });
  }
};

const deleteReviewById = async (req, res) => {
  try {
    const review = await queryReviewById(req.params.reviewId);
    await destroyReview(review);

    return res.status(httpStatus.OK).json({ message: 'Xoá thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi xoá review!',
      detail: err.message || err,
      success: false,
    });
  }
};

const createReview = catchAsync(async (req, res) => {
  try {
    const createdReview = await createOneReview({ ...req.body, userId: req.user.Id });
    if (createdReview) {
      res
        .status(httpStatus.OK)
        .json({ message: 'Tạo review thành công!', success: true, ...createdReview });

      const [product, count] = await Promise.all([
        queryProductById(req.body.productid),
        Review.count({ where: { ProductId: req.body.productid } }),
      ]);
      await saveProduct(product, { rate: (product.Rate * count + req.body.rate) / (count + 1) });
    }
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tạo review!',
      detail: error.message || error,
      success: false,
    });
  }
});

module.exports = {
  getReviews,
  getReviewById,
  getReviewByProduct,
  updateReviewById,
  deleteReviewById,
  createReview,
};
