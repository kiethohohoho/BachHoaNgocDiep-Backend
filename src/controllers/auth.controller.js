const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  authService,
  accountService,
  tokenService,
  emailService,
  smsService,
} = require('../services');
// const logger = require('../config/logger');

const register = catchAsync(async (req, res) => {
  try {
    const account = await accountService.createAccount(req.body);
    const { access, refresh } = await tokenService.generateAuthTokens(account.Id);
    // await Promise.all([
    //   smsService.sendOtpSms(account.PhoneNumber, Math.floor(100000 + Math.random() * 900000)),
    //   emailService.sendEmail(
    //     account.Email,
    //     'Xác thực email đăng ký toàn khoản Bách Hoá Ngọc Diệp',
    //     `<p>Hãy click vào link này để xác thực email của bạn:</p><p><a href="${
    //       config.env !== 'production' ? 'http://localhost:3000' : 'https://be.bachhoangocdiep.com'
    //     }/v1/auth/verify-email/${access.token}">${
    //       config.env !== 'production' ? 'http://localhost:3000' : 'https://be.bachhoangocdiep.com'
    //     }/v1/auth/verify-email/${access.token}</a></p>`
    //   ),
    // ]);
    await emailService.sendEmail(
      account.Email,
      'Xác thực email đăng ký toàn khoản Bách Hoá Ngọc Diệp',
      `<h3>Mã xác thực của bạn là:</h3> ${account.OTPPhoneVerified}`
    );
    res.status(httpStatus.CREATED).json({ user: account, access, refresh, success: true });
  } catch (err) {
    res
      .status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'Lỗi đăng ký tài khoản!', detail: err.message || err, success: false });
  }
});

const login = catchAsync(async (req, res) => {
  const account = await authService.loginUserWithStuffsAndPassword(req.body);
  const tokens = await tokenService.generateAuthTokens(account.Id);
  res.send({ user: account, tokens, success: true });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
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
  sendVerificationEmail,
  verifyEmailAccount,
  verifyOtp,
};
