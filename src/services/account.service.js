const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { Account, User } = require('../models');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');

/**
 * Create a Account
 * @param {AccountBody} accountBody
 * @returns {Promise<Account>}
 */
const createAccount = async (accountBody) => {
  const {
    email,
    username,
    password,
    firstname = '',
    lastname = '',
    dateofbirth,
    gender,
    phonenumber,
  } = accountBody;

  try {
    // Check if user already exists
    const usernameExist = await Account.findOne({ where: { UserName: username } });
    if (usernameExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Tài khoản này đã tồn tại!');
    }

    // Check if email already exists
    const emailExist = await Account.findOne({ where: { Email: email } });
    if (emailExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email này đã tồn tại!');
    }

    // Check if email already exists
    const phoneExist = await Account.findOne({ where: { PhoneNumber: phonenumber } });
    if (phoneExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Số điện thoại này đã tồn tại!');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newAccount = await Account.create({
      FirstName: firstname,
      LastName: lastname,
      FullName: `${firstname} ${lastname}`,
      DateOfBirth: dateofbirth,
      Gender: gender,
      PhoneNumber: phonenumber,
      Email: email,
      UserName: username,
      Password: hashedPassword,
      IsAdmin: false,
      IsEmailVerified: false,
      IsPhoneVerified: false,
    });

    return newAccount;
  } catch (err) {
    logger.error('Error registering user', err);
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
  return User.findById(id);
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
 * @param {{phonenumber:string, email:string, username:string}} stuffs
 * @returns {Promise<User>}
 */
const getUserByStuffs = async ({ phonenumber = '', email = '', username = '' }) => {
  return Account.findOne({
    where: {
      [Op.or]: [{ UserName: username }, { Email: email }, { PhoneNumber: phonenumber }],
    },
  });
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
  getUserByStuffs,
  updateAccountById,
  deleteUserById,
};