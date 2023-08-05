import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import usersService from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body;
  const result = await usersService.createUser(user);

  // res.status(200).json({
  //   success: true,
  //   message: 'Successfully Created User',
  //   data: result,
  // });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Created User!',
    data: result,
  });
});

export const UserController = {
  createUser,
};
