const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'BachHoaNgocDiep BackEnd API Documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/kiethohohoho/BachHoaNgocDiep-Backend/blob/main/README.md',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
