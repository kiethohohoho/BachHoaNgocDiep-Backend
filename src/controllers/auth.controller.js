const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  authService,
  accountService,
  tokenService,
  emailService,
  smsService,
  userService,
} = require('../services');
const mailBody = require('../config/mailBody');

const register = catchAsync(async (req, res) => {
  try {
    const account = await accountService.createAccount(req.body);
    const { access, refresh } = await tokenService.generateAuthTokens(account.Id);
    await Promise.all([
      smsService.sendOtpSms(account.PhoneNumber, account.OTPPhoneVerified),
      emailService.sendEmail(
        account.Email,
        'Xác thực đăng ký tài khoản | Bách Hoá Ngọc Diệp',
        mailBody(account.OTPPhoneVerified, account.Name, 'Đăng ký')
      ),
    ]);
    res.status(httpStatus.CREATED).json({ user: account, access, refresh, success: true });
  } catch (err) {
    res
      .status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'Lỗi đăng ký tài khoản!', detail: err.message || err, success: false });
  }
});

const login = catchAsync(async (req, res) => {
  try {
    const account = await authService.loginUserWithStuffsAndPassword(req.body);
    if (account) {
      const tokens = await tokenService.generateAuthTokens(account.Id);
      const [userAddress, userPayment] = await Promise.all([
        userService.getUserAddress(account.Id),
        userService.getUserPayment(account.Id),
      ]);
      res.status(httpStatus.OK).json({
        tokens,
        profile: { general: account, address: userAddress, payment: userPayment },
        success: true,
      });
    }
  } catch (err) {
    res
      .status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'Lỗi đăng nhập tài khoản!', detail: err.message || err, success: false });
  }
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshtoken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  try {
    const account = await accountService.getUserByEmail(req.body.email);
    await accountService.changeOTPPhoneVerified(account);
    await Promise.all([
      smsService.sendOtpSms(account.PhoneNumber, account.OTPPhoneVerified),
      emailService.sendEmail(
        account.Email,
        'Xác thực mã OTP quên mật khẩu | Bách Hoá Ngọc Diệp',
        mailBody(account.OTPPhoneVerified, account.Name, 'Quên mật khẩu')
      ),
    ]);

    res
      .status(httpStatus.OK)
      .json({ message: `Đã gửi mã xác thực đến email ${account.Email}`, success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Có lỗi xảy ra với email của bạn!',
      detail: err.message || err,
      success: false,
    });
  }
});

const resetPassword = catchAsync(async (req, res) => {
  try {
    await authService.resetPassword(req.body.email, req.body.code, req.body.newpassword);
    res.status(httpStatus.OK).json({ success: true, message: 'Đổi mật khẩu thành công' });
  } catch (err) {
    res
      .status(err.statusCode || httpStatus.UNAUTHORIZED)
      .json({ message: 'Đổi mật khẩu thất bại!', detail: err.message || err });
  }
});

const changePassword = catchAsync(async (req, res) => {
  try {
    const { email, oldpassword, newpassword } = req.body;
    await authService.changePassword(email, oldpassword, newpassword);
    res.status(httpStatus.OK).json({ success: true, message: 'Đổi mật khẩu thành công' });
  } catch (err) {
    res
      .status(err.statusCode || httpStatus.UNAUTHORIZED)
      .json({ message: 'Đổi mật khẩu thất bại!', detail: err.message || err });
  }
});

const verifyEmailAccount = catchAsync(async (req, res) => {
  try {
    const { code } = req.body;
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // const
    await authService.verifyEmail({ token, code });
    res.status(httpStatus.OK).json({
      IsVerified: true,
      message: 'Xác thực email thành công!',
      success: true,
    });
  } catch (err) {
    res
      .status(err.statusCode || httpStatus.UNAUTHORIZED)
      .json({ message: 'Xác thực email thất bại!', detail: err.message || err });
  }
});

const verifyOtp = catchAsync(async (req, res) => {
  try {
    const { otp } = req.params;
    await smsService.verifyOtp(otp);
    res.status(httpStatus.OK).send('Xác thực email thành công!');
  } catch (err) {
    res
      .status(err.statusCode || httpStatus.UNAUTHORIZED)
      .json({ message: 'Xác thực email thất bại!', detail: err.message || err });
  }
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyEmailAccount,
  verifyOtp,
};
