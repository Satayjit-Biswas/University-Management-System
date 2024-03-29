import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config/config';
import { catchAsync } from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  console.log(req.body);

  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...othersData } = result;

  // set refresh token into cookie
  const cookieOptions = { secure: config.env === 'production', httpOnly: true };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully!',
    data: othersData,
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = { secure: config.env === 'production', httpOnly: true };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully!',
    data: result,
  });
});
export const AuthController = { loginUser, refreshToken };
