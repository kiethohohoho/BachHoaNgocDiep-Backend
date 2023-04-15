const httpStatus = require('http-status');
const {
  queryCarts,
  queryCartById,
  createOneCart,
  saveCart,
  destroyCart,
  queryCartsByCategoryId,
} = require('../services/cart.service');
const catchAsync = require('../utils/catchAsync');

const getCarts = catchAsync(async (req, res) => {
  try {
    const Carts = await queryCarts({ ...req.query, user: req.user });
    res.status(httpStatus.OK).json({ Carts, success: true });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi lấy danh sách giỏ hàng!',
      detail: error.message || error,
      success: false,
    });
  }
});

const getCartById = async (req, res) => {
  try {
    const cart = await queryCartById(req.params.cartId);
    return res.status(httpStatus.OK).json({ cart, success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm giỏ hàng!',
      detail: err.message || err,
      success: false,
    });
  }
};

const getCartsByAccountId = async (req, res) => {
  try {
    const carts = await queryCartsByCategoryId(req.params.accountId);
    return res.status(httpStatus.OK).json({ carts, success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm giỏ hàng!',
      detail: err.message || err,
      success: false,
    });
  }
};

const updateCartById = async (req, res) => {
  try {
    const cart = await queryCartById(req.params.cartId);
    await saveCart(cart, req.body);

    return res.status(httpStatus.OK).json({ message: 'Cập nhật thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm giỏ hàng!',
      detail: err.message || err,
      success: false,
    });
  }
};

const deleteCartById = async (req, res) => {
  try {
    const cart = await queryCartById(req.params.cartId);
    await destroyCart(cart);

    return res.status(httpStatus.OK).json({ message: 'Xoá thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi xoá giỏ hàng!',
      detail: err.message || err,
      success: false,
    });
  }
};

const createCart = catchAsync(async (req, res) => {
  try {
    const createdCart = await createOneCart({ ...req.body, user: req.user });
    if (createdCart) {
      res.status(httpStatus.OK).json({
        message: 'Thêm vào giỏ hàng thành công!',
        success: true,
        // ...createdCart
      });
    }
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi thêm vào giỏ hàng!',
      detail: error.message || error,
      success: false,
    });
  }
});

module.exports = {
  getCarts,
  getCartById,
  getCartsByAccountId,
  updateCartById,
  deleteCartById,
  createCart,
};
