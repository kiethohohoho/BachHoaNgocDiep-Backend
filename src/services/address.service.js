/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const { Address, Account } = require('../models');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');
// const logger = require('../config/logger');

/**
 * Query for addresses
 * @param {Object} query - Request query
 * @returns {Promise<QueryResult>}
 */
const queryAddresss = async (query) => {
  const addresses = await paginate(Address, {
    ...query,
    filter: {
      AccountId: {
        eq: query.user.Id,
      },
    },
  });
  return addresses;
};

/**
 * Update one address
 * @param {string} addressId - addressId
 * @returns {Promise<QueryResult>}
 */
const queryAddressById = async (addressId) => {
  const address = await Address.findByPk(addressId, {
    include: [Account],
  });
  if (!address) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Địa chỉ không tồn tại!');
  }
  return address.get({ plain: true });
};

/**
 * Change record value and save
 * @param {Address} address - address record
 * @param {Object} body - Request body
 * @returns {Promise<SaveResult>}
 */
const saveAddress = async (address, body) => {
  const { name, isdefault, city, district, ward, street } = body;
  if (name) {
    address.Name = name;
  }
  if (isdefault) {
    address.IsDefault = isdefault;
  }
  if (city) {
    address.City = city;
  }
  if (district) {
    address.District = district;
  }
  if (ward) {
    address.Ward = ward;
  }
  if (street) {
    address.Street = street;
  }
  await address.save();
};

/**
 * Destroy a record
 * @param {Address} address - address record
 * @returns {Promise<DestroyResult>}
 */
const destroyAddress = async (address) => {
  await address.destroy();
};

/**
 * Create one address
 * @param {Object} body - Request body
 * @returns {Promise<CreateResult>}
 */
const createOneAddress = async (body) => {
  const { name, isdefault = false, city = '', district = '', ward = '', street = '', user } = body;

  const address = await Address.findOne({
    where: {
      AccountId: user.Id,
      Name: name,
    },
  });

  if (!address) {
    await Address.create({
      AccountId: user.Id,
      Name: name,
      IsDefault: isdefault,
      City: city,
      District: district,
      Ward: ward,
      Street: street,
    });
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tên này đã tồn tại!');
  }
  return address.get({ plain: true });
};

module.exports = { queryAddresss, queryAddressById, saveAddress, destroyAddress, createOneAddress };
