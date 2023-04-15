const allRoles = {
  user: ['verifyEmail', 'getProducts', 'uploadImages', 'getProfile'],
  admin: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
