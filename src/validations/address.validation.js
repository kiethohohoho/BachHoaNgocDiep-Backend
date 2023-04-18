const Joi = require('joi');

const getAddresss = {
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

const getOrDeleteAddressById = {
  params: Joi.object()
    .keys({
      addressId: Joi.string().required(),
    })
    .unknown(true),
};

const updateAddressById = {
  params: Joi.object()
    .keys({
      addressId: Joi.string().required(),
    })
    .unknown(true),
  body: Joi.object().keys({
    name: Joi.string(),
    isdefault: Joi.string(),
    city: Joi.string(),
    district: Joi.string(),
    ward: Joi.string(),
    street: Joi.string(),
  }),
};

const createAddress = {
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      isdefault: Joi.string(),
      city: Joi.string(),
      district: Joi.string(),
      ward: Joi.string(),
      street: Joi.string(),
    })
    .unknown(true),
};

module.exports = {
  getAddresss,
  getOrDeleteAddressById,
  updateAddressById,
  createAddress,
};
