import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import config from '../../config/config'
import { apiError } from '../../errors/apiErrors'
import { handleValidationError } from '../../errors/handleValidationError'
import { errorlogger } from '../../shared/logger'
import { IGenericErrorMessage } from '../interfaces/error'

export const glabalErrorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env === 'development'
    ? console.log('---GlobalErrorHandler---', error)
    : errorlogger.error('---GlobalErrorHandler---', error)

  let statusCode = 500
  let message = 'Something went Wrong !'
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessage
  } else if (error instanceof apiError) {
    statusCode = error?.statusCode
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
  next()
}
