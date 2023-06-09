const httpStatus = require('http-status');
const { analystService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const getRevenue = catchAsync(async (req, res) => {
  try {
    const { revenueToday, revenueThisWeek, revenueThisMonth } =
      await analystService.getRevenue(/* req.query.period */);
    res
      .status(httpStatus.OK)
      .json({ success: true, revenueToday, revenueThisWeek, revenueThisMonth });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi lấy danh sách giỏ hàng!',
      detail: error.message || error,
      success: false,
    });
  }
});

const getSaleProductToday = catchAsync(async (req, res) => {
  try {
    const { revenueToday, revenueYesterday } = await analystService.getSaleProductToday();
    res.status(httpStatus.OK).json({
      success: true,
      revenueToday,
      revenueYesterday,
      ratio: (revenueToday - revenueYesterday) / revenueYesterday,
    });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi lấy danh sách giỏ hàng!',
      detail: error.message || error,
      success: false,
    });
  }
});

const getAmountByPaidType = catchAsync(async (req, res) => {
  try {
    const { amountByCash, amountByTransfer } = await analystService.getAmountByPaidType();
    res.status(httpStatus.OK).json({
      success: true,
      amountByCash,
      amountByTransfer,
      total: amountByCash + amountByTransfer,
    });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi lấy danh sách giỏ hàng!',
      detail: error.message || error,
      success: false,
    });
  }
});

const getThreeBestSellingProducts = catchAsync(async (req, res) => {
  try {
    const { allProductsCount, bestSellingProducts } =
      await analystService.getThreeBestSellingProducts();
    res.status(httpStatus.OK).json({
      success: true,
      allProductsCount,
      bestSellingProducts,
    });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi lấy danh sách giỏ hàng!',
      detail: error.message || error,
      success: false,
    });
  }
});

module.exports = {
  getRevenue,
  getSaleProductToday,
  getAmountByPaidType,
  getThreeBestSellingProducts,
};
