const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const tokenService = require('./token.service');
const accountService = require('./account.service');
const Token = require('../models/token.model');
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
    const isMatch = bcrypt.compareSync(password, account.Password);
    if (!isMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Sai mật khẩu!');
    } else {
      const plainAccount = account.get({ plain: true });
      delete plainAccount.UserName;
      delete plainAccount.Password;
      return plainAccount;
    }
  }
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);

    const user = await accountService.getUserById(refreshTokenDoc.sub);
    console.log(user);
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
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      tokenTypes.RESET_PASSWORD
    );
    const user = await accountService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await accountService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
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
  verifyEmail,
};
