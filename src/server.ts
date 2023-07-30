import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/config';
import { errorlogger, logger } from './shared/logger';

process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});
let server: Server;

async function connectDB() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(`Database is connected successfully!`);

    server = app.listen(config.port, () => {
      logger.info(`App Listening on port: http://localhost:${config.port}`);
    });
  } catch (error) {
    errorlogger.error('Failed to connect database!', error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

connectDB();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
