import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../app/interfaces/commonRes';
import { IGenericErrorMessage } from '../app/interfaces/error';

export const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const statusCode = 400;
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};
