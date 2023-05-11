const xss = require('xss-clean');

module.exports = function () {
  return function (req, res, next) {
    if (req.url === '/v1/products' && req.body) {
      next();
    } else {
      next(xss());
    }
  };
};
