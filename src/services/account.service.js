/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const { Account, User } = require('../models');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');

/**
 * Create a Account
 * @param {AccountBody} accountBody
 * @returns {Promise<Account>}
 */
const createAccount = async (accountBody) => {
  const { email, phonenumber, firstname = '', lastname = '', password } = accountBody;

  try {
    // Check if email already exists
    if (email) {
      const emailExist = await Account.findOne({ where: { Email: email } });
      if (emailExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email này đã tồn tại!');
      }
    }

    // Check if phone number already exists
    if (phonenumber) {
      const phoneExist = await Account.findOne({ where: { PhoneNumber: phonenumber } });
      if (phoneExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Số điện thoại này đã tồn tại!');
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newAccount = await Account.create({
      FirstName: firstname,
      LastName: lastname,
      FullName: `${firstname} ${lastname}`,
      PhoneNumber: phonenumber,
      Email: email,
      UserName: email,
      Password: hashedPassword,
      IsAdmin: false,
      IsEmailVerified: false,
      IsPhoneVerified: false,
      OTPPhoneVerified: `${Math.floor(100000 + Math.random() * 900000)}`,
    });

    return newAccount;
  } catch (err) {
    logger.error('Lỗi tạo tài khoản!', err);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  const user = await Account.findByPk(id);
  return user;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<Account>}
 */
const getAccountById = async (id) => {
  return Account.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<Account>}
 */
const getUserByEmail = async (email = '') => {
  const account = await Account.findOne({ where: { Email: email } });
  if (!account) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Email ${email} không tồn tại!`);
  }
  return account;
};

/**
 * Change OTPPhoneVerified
 * @param {Account} account
 * @returns {Promise<SaveResult>}
 */
const changeOTPPhoneVerified = async (account) => {
  if (!account) {
    return;
  }
  account.OTPPhoneVerified = `${Math.floor(100000 + Math.random() * 900000)}`;
  await account.save();
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Account>}
 */
const updateAccountById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createAccount,
  queryUsers,
  getUserById,
  getAccountById,
  getUserByEmail,
  changeOTPPhoneVerified,
  updateAccountById,
  deleteUserById,
};
