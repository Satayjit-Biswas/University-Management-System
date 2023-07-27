import path from 'path'
import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf, prettyPrint } = format

// logs/winston/
// success.log
// error.log

// Custom log Format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`
})

export const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'UM' }), timestamp(), myFormat, prettyPrint()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'successs.log'),
      level: 'info',
    }),
  ],
})

export const errorlogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'UM' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
      level: 'error',
    }),
  ],
})
