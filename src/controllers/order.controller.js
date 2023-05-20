const httpStatus = require('http-status');
const {
  queryOrders,
  queryOrderById,
  createOneOrder,
  saveOrder,
  destroyOrder,
} = require('../services/order.service');
const catchAsync = require('../utils/catchAsync');

const getOrders = catchAsync(async (req, res) => {
  try {
    const Orders = await queryOrders({ ...req.query, user: req.user });
    res.status(httpStatus.OK).json({ Orders, success: true });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi lấy danh sách đơn hàng!',
      detail: error.message || error,
      success: false,
    });
  }
});

const getOrderById = async (req, res) => {
  try {
    const { order, carts } = await queryOrderById(req.params.orderId);
    return res.status(httpStatus.OK).json({ success: true, order, carts });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm đơn hàng!',
      detail: err.message || err,
      success: false,
    });
  }
};

const updateOrderById = async (req, res) => {
  try {
    const { order } = await queryOrderById(req.params.orderId);
    await saveOrder(order, req.body);

    return res.status(httpStatus.OK).json({ message: 'Cập nhật thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm đơn hàng!',
      detail: err.message || err,
      success: false,
    });
  }
};

const deleteOrderById = async (req, res) => {
  try {
    const { order } = await queryOrderById(req.params.orderId);
    await destroyOrder(order);

    return res.status(httpStatus.OK).json({ message: 'Xoá thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi xoá đơn hàng!',
      detail: err.message || err,
      success: false,
    });
  }
};

const createOrder = catchAsync(async (req, res) => {
  try {
    const createdOrder = await createOneOrder(req.body, req.user);
    if (createdOrder) {
      res
        .status(httpStatus.OK)
        .json({ message: 'Tạo đơn hàng thành công!', success: true, ...createdOrder });
    }
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tạo đơn hàng!',
      detail: error.message || error,
      success: false,
    });
  }
});

module.exports = {
  getOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  createOrder,
};
