const httpStatus = require('http-status');
const { analystService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const getRevenue = catchAsync(async (req, res) => {
  try {
    const { revenueToday, revenueThisWeek, revenueThisMonth } =
      await analystService.getRevenueByPeriod(/* req.query.period */);
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

module.exports = {
  getRevenue,
};
