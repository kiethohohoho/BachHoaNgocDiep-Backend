const allRoles = {
  user: ['getProducts'],
  admin: ['getUsers', 'manageAccounts', 'manageProducts'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
