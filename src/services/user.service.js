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
 * @param {Object} body - update body
 * @returns {Promise<QueryResult>}
 */
const updateProfile = async (body) => {
  const { user, email, firstname, lastname, dateofbirth, gender, avatar, phonenumber } = body;

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
  if (email) {
    user.Email = email;
    user.UserName = email;
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
