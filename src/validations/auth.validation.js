const Joi = require('joi');
const { password, emailCode } = require('./custom.validation');

const register = {
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      username: Joi.string(),
      password: Joi.string().required().custom(password),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      dateofbirth: Joi.date(),
      gender: Joi.boolean(),
      phonenumber: Joi.string().pattern(/^(03|05|07|08|09)+([0-9]{8})\b/),
    })
    .unknown(true),
};

const login = {
  body: Joi.object()
    .keys({
      phonenumber: Joi.string().pattern(/^(03|05|07|08|09)+([0-9]{8})\b/),
      email: Joi.string().email(),
      username: Joi.string(),
      password: Joi.string().required().custom(password),
    })
    .or('phonenumber', 'email', 'username')
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
  query: Joi.object()
    .keys({
      token: Joi.string().required(),
    })
    .unknown(true),
  body: Joi.object()
    .keys({
      password: Joi.string().required().custom(password),
    })
    .unknown(true),
};

const verifyEmail = {
  body: Joi.object()
    .keys({
      code: Joi.string().required().custom(emailCode),
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
  verifyEmail,
  otp,
};
