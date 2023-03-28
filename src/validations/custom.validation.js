const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mssql id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 6) {
    return helpers.message('Mật khẩu phải có ít nhất 8 ký tự!');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('Mật khẩu phải có ít 1 chữ cái và 1 chữ số!');
  }
  return value;
};

module.exports = {
  objectId,
  password,
};
