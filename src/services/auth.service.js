const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const tokenService = require('./token.service');
const accountService = require('./account.service');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const config = require('../config/config');
const { Account } = require('../models');

/**
 * Login with username and password
 * @param {{phonenumber:string, email:string, username:string, password:string}} loginBody
 * @returns {Promise<User>}
 */
const loginUserWithStuffsAndPassword = async (loginBody) => {
  const { email, password } = loginBody;
  const account = await accountService.getUserByEmail(email);
  if (account) {
    const isVerified = !!account.IsEmailVerified;
    if (!isVerified) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Tài khoản chưa xác thực!');
    }
    const isMatch = bcrypt.compareSync(password, account.Password);
    if (!isMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Sai mật khẩu!');
    }
    const plainAccount = account.get({ plain: true });
    delete plainAccount.UserName;
    delete plainAccount.Password;
    return plainAccount;
  }
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async () => {};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);

    const user = await accountService.getUserById(refreshTokenDoc.sub);
    if (!user) {
      throw new Error();
    }
    // await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user.Id);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} email
 * @param {string} code
 * @param {string} newpassword
 * @returns {Promise}
 */
const resetPassword = async (email, code, newpassword) => {
  const account = await accountService.getUserByEmail(email);
  const isMatchOtp = code === account.OTPPhoneVerified;
  if (isMatchOtp) {
    account.Password = await bcrypt.hash(newpassword, 10);
    await account.save();
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Sai OTP');
  }
};

/**
 * Reset password
 * @param {string} email
 * @param {string} oldpassword
 * @param {string} newpassword
 * @returns {Promise}
 */
const changePassword = async (email, oldpassword, newpassword) => {
  const account = await accountService.getUserByEmail(email);
  if (account) {
    if (bcrypt.compareSync(oldpassword, account.Password)) {
      account.Password = await bcrypt.hash(newpassword, 10);
      await account.save();
    } else {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Sai mật khẩu!');
    }
  }
};

/**
 * Verify email
 * @param {string} token
 * @param {string} code
 * @returns {Promise}
 */
const verifyEmail = async ({ token, code }) => {
  try {
    const payload = jwt.verify(token, config.jwt.secret);
    const account = await Account.findOne({
      where: {
        Id: payload.sub,
      },
    });
    // Check if record doesn't exist in db
    if (!account) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Tài khoản không tồn tại!');
    }

    if (account.OTPPhoneVerified !== code) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Mã xác thực không đúng!');
    }

    await Account.update(
      { IsEmailVerified: true },
      {
        where: {
          Id: account.Id,
        },
      }
    );
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Xác thực email thất bại!');
  }
};

module.exports = {
  loginUserWithStuffsAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  changePassword,
  verifyEmail,
};
