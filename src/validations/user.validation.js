const Joi = require('joi');

const getUsers = {
  query: Joi.object()
    .keys({
      search: Joi.string(),
      filter: Joi.object(),
      sort: Joi.string(),
      order: Joi.string(),
      page: Joi.number().integer().min(1),
      limit: Joi.number().integer().min(1),
    })
    .unknown(true),
};

const updateProfile = {
  body: Joi.object().keys({
    firstname: Joi.string(),
    lastname: Joi.string(),
    dateofbirth: Joi.date(),
    gender: Joi.boolean(),
    avatar: Joi.string(),
    phonenumber: Joi.string().pattern(/^(03|05|07|08|09)+([0-9]{8})\b/),
  }),
};
module.exports = { getUsers, updateProfile };
