const Joi = require('joi');

const getOrderDetails = {
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

const getOrderDetailByOrderId = {
  params: Joi.object()
    .keys({
      orderDetailGroupId: Joi.string().required(),
    })
    .unknown(true),
};

const getOrDeleteOrderDetailById = {
  params: Joi.object()
    .keys({
      orderDetailId: Joi.string().required(),
    })
    .unknown(true),
};

const updateOrderDetailById = {
  params: Joi.object()
    .keys({
      orderDetailId: Joi.string().required(),
    })
    .unknown(true),
  body: Joi.object().keys({
    orderDetailgroupid: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
  }),
};

const createOrderDetail = {
  body: Joi.object()
    .keys({
      orderDetailgroupid: Joi.string(),
      name: Joi.string(),
      description: Joi.string(),
    })
    .unknown(true),
};

module.exports = {
  getOrderDetails,
  getOrderDetailByOrderId,
  getOrDeleteOrderDetailById,
  updateOrderDetailById,
  createOrderDetail,
};
