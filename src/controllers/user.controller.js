const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const getUserProfile = catchAsync(async (req, res) => {
  res
    .status(httpStatus.OK)
    .json({ message: 'Tạo giỏ hàng thành công!', success: true, profile: req.user });
});

module.exports = {
  getUserProfile,
};
