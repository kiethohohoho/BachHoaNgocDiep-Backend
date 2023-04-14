const allRoles = {
  user: ['verifyEmail', 'getProducts', 'uploadImages'],
  admin: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
