import mongoose from 'mongoose'
import app from './app'
import config from './config/config'
import { errorlogger, logger } from './shared/logger'

async function connectDB() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database is connected successfully!`)
    app.listen(config.port, () => {
      logger.info(`App Listening on port: http://localhost:${config.port}`)
    })
  } catch (error) {
    errorlogger.error('Failed to connect database!', error)
  }
}

connectDB()
