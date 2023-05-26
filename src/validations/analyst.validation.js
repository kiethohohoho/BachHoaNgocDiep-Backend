const Joi = require('joi');

const getRevenue = {
  query: Joi.object()
    .keys({
      // period: Joi.string(),
    })
    .unknown(true),
};

module.exports = {
  getRevenue,
};
