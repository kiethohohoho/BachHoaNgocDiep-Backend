const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const getUserProfile = catchAsync(async (req, res) => {
  const [userAddress, userPayment] = await Promise.all([
    userService.getUserAddress(req.user.Id),
    userService.getUserPayment(req.user.Id),
  ]);
  res.status(httpStatus.OK).json({
    message: 'Lấy profile thành công!',
    success: true,
    profile: { general: req.user, address: userAddress, payment: userPayment },
  });
});

const updateUserProfile = catchAsync(async (req, res) => {
  await userService.updateProfile({ ...req.body, user: req.user });
  res.status(httpStatus.OK).json({
    message: 'Update profile thành công!',
    success: true,
  });
});

module.exports = {
  getUserProfile,
  updateUserProfile,
};
