const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, account, info) => {
  if (err || info || !account) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Bạn chưa đăng nhập!'));
  }
  req.user = account;

  if (requiredRights.length) {
    if (!account.dataValues.IsAdmin) {
      const userRights = roleRights.get('user');

      const hasRequiredRights = requiredRights.every((requiredRight) =>
        userRights.includes(requiredRight)
      );

      if (!hasRequiredRights && req.params.userId !== account.Id) {
        return reject(new ApiError(httpStatus.FORBIDDEN, 'Bạn bị cấm thực hiện yêu cầu này!'));
      }
    }
  }

  resolve();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
