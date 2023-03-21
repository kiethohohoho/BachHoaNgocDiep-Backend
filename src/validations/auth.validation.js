const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().custom(password),
      username: Joi.string().required(),
    })
    .unknown(true),
};

const login = {
  body: Joi.object()
    .keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    })
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
  query: Joi.object()
    .keys({
      token: Joi.string().required(),
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
};
