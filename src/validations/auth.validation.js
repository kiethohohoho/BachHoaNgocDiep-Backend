const Joi = require('joi');
const { password, OTP } = require('./custom.validation');

const register = {
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      phonenumber: Joi.string().required(),
      password: Joi.string().required().custom(password),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
    })
    .unknown(true),
};

const login = {
  body: Joi.object()
    .keys({
      // phonenumber: Joi.string().pattern(/^(03|05|07|08|09)+([0-9]{8})\b/),
      email: Joi.string().required().email(),
      // username: Joi.string(),
      password: Joi.string().required().custom(password),
    })
    // .or('phonenumber', 'email', 'username')
    .unknown(true),
};

const logout = {
  body: Joi.object()
    .keys({
      refreshtoken: Joi.string().required(),
    })
    .unknown(true),
};

const refreshTokens = {
  body: Joi.object()
    .keys({
      refreshtoken: Joi.string().required(),
    })
    .unknown(true),
};

const forgotPassword = {
  body: Joi.object()
    .keys({
      email: Joi.string().email().required(),
    })
    .unknown(true),
};

const resetPassword = {
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      code: Joi.string().required().custom(OTP),
      newpassword: Joi.string().required().custom(password),
    })
    .unknown(true),
};

const changePassword = {
  body: Joi.object()
    .keys({
      oldpassword: Joi.string().required().custom(password),
      newpassword: Joi.string().required().custom(password),
    })
    .unknown(true),
};

const verifyEmail = {
  body: Joi.object()
    .keys({
      code: Joi.string().required().custom(OTP),
    })
    .unknown(true),
};

const otp = {
  params: Joi.object()
    .keys({
      otp: Joi.string().required(),
    })
    .unknown(true),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyEmail,
  otp,
};
