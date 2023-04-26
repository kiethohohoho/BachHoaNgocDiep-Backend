const httpStatus = require('http-status');
const {
  queryPayments,
  queryPaymentById,
  createOnePayment,
  savePayment,
  destroyPayment,
  queryPaymentsByProfile,
} = require('../services/payment.service');
const catchAsync = require('../utils/catchAsync');

const getPayments = catchAsync(async (req, res) => {
  try {
    const Payments = await queryPayments(req.query);
    res.status(httpStatus.OK).json({ Payments, success: true });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi lấy danh sách payment!',
      detail: error.message || error,
      success: false,
    });
  }
});

const getPaymentById = async (req, res) => {
  try {
    const payment = await queryPaymentById(req.params.paymentId);
    return res.status(httpStatus.OK).json({ payment, success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm payment!',
      detail: err.message || err,
      success: false,
    });
  }
};

const getPaymentByProfile = async (req, res) => {
  try {
    const payment = await queryPaymentsByProfile(req.user.Id);
    return res.status(httpStatus.OK).json({ payment, success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm payment!',
      detail: err.message || err,
      success: false,
    });
  }
};

const updatePaymentById = async (req, res) => {
  try {
    const payment = await queryPaymentById(req.params.paymentId);
    await savePayment(payment, req.body);

    return res.status(httpStatus.OK).json({ message: 'Cập nhật thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm payment!',
      detail: err.message || err,
      success: false,
    });
  }
};

const deletePaymentById = async (req, res) => {
  try {
    const payment = await queryPaymentById(req.params.paymentId);
    await destroyPayment(payment);

    return res.status(httpStatus.OK).json({ message: 'Xoá thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi xoá payment!',
      detail: err.message || err,
      success: false,
    });
  }
};

const createPayment = catchAsync(async (req, res) => {
  try {
    const createdPayment = await createOnePayment({ ...req.body, userId: req.user.Id });
    if (createdPayment) {
      res
        .status(httpStatus.OK)
        .json({ message: 'Tạo payment thành công!', success: true, ...createdPayment });
    }
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tạo payment!',
      detail: error.message || error,
      success: false,
    });
  }
});

module.exports = {
  getPayments,
  getPaymentById,
  getPaymentByProfile,
  updatePaymentById,
  deletePaymentById,
  createPayment,
};
