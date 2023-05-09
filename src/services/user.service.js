const { Address, Payment } = require('../models');

/**
 * Get user address
 * @param {string} id - Account Id
 * @returns {Promise<QueryResult>}
 */
const getUserAddress = async (id) => {
  const userAddress = await Address.findOne({
    where: {
      AccountId: id,
      IsDefault: true,
    },
  });
  return userAddress;
};

/**
 * Get user payment
 * @param {string} id - Account Id
 * @returns {Promise<QueryResult>}
 */
const getUserPayment = async (id) => {
  const userPayment = await Payment.findOne({
    where: {
      AccountId: id,
    },
  });
  return userPayment;
};

/**
 * Update profile
 * @param {Account} userBody - userBody
 * @returns {Promise<QueryResult>}
 */
const updateProfile = async (userBody) => {
  const { user, firstname, lastname, dateofbirth, gender, avatar, phonenumber } = userBody;

  if (firstname) {
    user.FirstName = firstname;
  }
  if (lastname) {
    user.LastName = lastname;
  }
  if (firstname || lastname) {
    user.FullName = `${firstname} ${lastname}`;
  }
  if (dateofbirth) {
    user.DateOfBirth = dateofbirth;
  }
  if (gender) {
    user.Gender = gender;
  }
  if (phonenumber) {
    user.PhoneNumber = phonenumber;
  }
  if (avatar) {
    user.Avatar = avatar;
  }
  await user.save();
};

module.exports = {
  getUserAddress,
  getUserPayment,
  updateProfile,
};
