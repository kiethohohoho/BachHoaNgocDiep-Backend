/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const { Payment, Account } = require('../models');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');
// const logger = require('../config/logger');

/**
 * Query for payments
 * @param {Object} query - Request query
 * @returns {Promise<QueryResult>}
 */
const queryPayments = async (query) => {
  const payments = await paginate(Payment, query);
  return payments;
};

/**
 * Query for one payment by Id
 * @param {string} paymentId - paymentId
 * @returns {Promise<QueryResult>}
 */
const queryPaymentById = async (paymentId) => {
  const payment = await Payment.findByPk(paymentId, {
    include: [Account],
  });
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment không tồn tại!');
  }
  return payment;
};

/**
 * Query for one payment by Id
 * @param {string} accountId - AccountId
 * @returns {Promise<QueryResult>}
 */
const queryPaymentsByProfile = async (accountId) => {
  const payments = await Payment.findOne({
    where: { AccountId: accountId },
    include: [Account],
  });
  if (!payments) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment không tồn tại!');
  }
  return payments;
};

/**
 * Change record value and save
 * @param {Payment} payment - payment record
 * @param {Object} body - Request body
 * @returns {Promise<SaveResult>}
 */
const savePayment = async (payment, body) => {
  const { cardnumber, ownername, bankname } = body;
  if (cardnumber) {
    payment.CardNumber = cardnumber;
  }
  if (ownername) {
    payment.OwnerName = ownername;
  }
  if (bankname) {
    payment.BankName = bankname;
  }
  await payment.save();
};

/**
 * Destroy a record
 * @param {Payment} payment - payment record
 * @returns {Promise<DestroyResult>}
 */
const destroyPayment = async (payment) => {
  await payment.destroy();
};

/**
 * Create one payment
 * @param {Object} body - Request body
 * @returns {Promise<CreateResult>}
 */
const createOnePayment = async (body) => {
  const { userId, cardnumber, ownername, bankname } = body;

  const existPayment = await Payment.findOne({
    where: { CardNumber: cardnumber, BankName: bankname },
  });

  if (existPayment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment đã tồn tại!');
  }

  const newPayment = await Payment.create({
    AccountId: userId,
    CardNumber: cardnumber,
    OwnerName: ownername,
    BankName: bankname,
  });
  return newPayment.get({ plain: true });
};

module.exports = {
  queryPayments,
  queryPaymentById,
  queryPaymentsByProfile,
  savePayment,
  destroyPayment,
  createOnePayment,
};
