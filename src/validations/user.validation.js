const Joi = require('joi');

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
module.exports = { updateProfile };
