const sequelize = require('./config/database');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

let server;

sequelize
  .authenticate()
  .then(() => {
    logger.info('Thiết lập kết nối đến cơ sở dữ liệu BachHoaNgocDiep thành công.');
    server = app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  })
  .catch((error) => logger.error('Không thể kết nối đến cơ sở dữ liệu BachHoaNgocDiep:', error));

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
