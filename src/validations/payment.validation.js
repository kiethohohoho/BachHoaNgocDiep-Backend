const Joi = require('joi');

const getPayments = {
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

const getPaymentByProfile = {};

const getOrDeletePaymentById = {
  params: Joi.object()
    .keys({
      paymentId: Joi.string().required(),
    })
    .unknown(true),
};

const updatePaymentById = {
  params: Joi.object()
    .keys({
      paymentId: Joi.string().required(),
    })
    .unknown(true),
  body: Joi.object().keys({
    cardnumber: Joi.string(),
    ownername: Joi.string(),
    bankname: Joi.string(),
  }),
};

const createPayment = {
  body: Joi.object()
    .keys({
      cardnumber: Joi.string().required(),
      ownername: Joi.string().required(),
      bankname: Joi.string().required(),
    })
    .unknown(true),
};

module.exports = {
  getPayments,
  getPaymentByProfile,
  getOrDeletePaymentById,
  updatePaymentById,
  createPayment,
};
