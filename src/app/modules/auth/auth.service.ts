import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config/config';
import { apiError } from '../../../errors/apiErrors';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginUserResponse,
  IRefreshTokenResponse,
  IloginUser,
} from './auth.interface';

const loginUser = async (payload: IloginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  // check user exist
  // const isUSerExist = await User.findOne(
  //   { id },
  //   { id: 1, password: 1, needsPasswordChange: 1 }
  // ).lean();

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new apiError(httpStatus.NOT_FOUND, 'User does not exist...');
  }

  // Mattch password
  // const isPasswordMatched = await bcrypt.compare(
  //   password,
  //   isUserExist?.password
  // );

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new apiError(
      httpStatus.UNAUTHORIZED,
      'Your Password is not Matched...'
    );
  }

  // create access token
  // const accessToken = jwt.sign(
  //   {
  //     id: isUserExist?.id,
  //     role: isUserExist?.admin,
  //   },
  //   config.jwt.secret as Secret,
  //   {
  //     expiresIn: config.jwt.expires_in,
  //   }
  // );
  // const refreshToken = jwt.sign(
  //   {
  //     id: isUserExist?.id,
  //     role: isUserExist?.admin,
  //   },
  //   config.jwt.refresh_secret as Secret,
  //   {
  //     expiresIn: config.jwt.refresh_expires_in,
  //   }
  // );
  const { id: userId, role, needsPasswordChange } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return { accessToken, refreshToken, needsPasswordChange };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  // invalid token - synchronous
  let verifyToken = null;
  try {
    verifyToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    // err
    throw new apiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { userId } = verifyToken;

  //checking deleted user but refresh token has available

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new apiError(httpStatus.NOT_FOUND, 'User does not exist...');
  }
  // Generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};
// Method 1
// const changePassword = async (
//   user: JwtPayload | null,
//   payload: IChangePassword
// ): Promise<void> => {
//   const { oldPassword, newPassword } = payload;
//   // Checking is user exist
//   const isUserExist = await User.isUserExist(user?.userId);

//   if (!isUserExist) {
//     throw new apiError(httpStatus.NOT_FOUND, 'User does not exist...');
//   }
//   // Checking oldpassword
//   if (
//     isUserExist.password &&
//     !(await User.isPasswordMatched(oldPassword, isUserExist.password))
//   ) {
//     throw new apiError(httpStatus.UNAUTHORIZED, 'old Password is incorrect...');
//   }

//   //hash password before saving
//   const newHashesPassword = await bcrypt.hash(
//     newPassword,
//     Number(config.bycrypt_salt_rounds)
//   );
//   const updatedData = {
//     password: newHashesPassword,
//     needsPasswordChange: false,
//     passwordChangeAt: new Date(),
//   };
//   // update password
//   await User.findOneAndUpdate({ id: user?.userId }, updatedData);
// };
// Method 2 With instance
const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  // Checking is user exist
  // const isUserExist = await User.isUserExist(user?.userId);

  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  );

  if (!isUserExist) {
    throw new apiError(httpStatus.NOT_FOUND, 'User does not exist...');
  }
  // Checking oldpassword
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new apiError(httpStatus.UNAUTHORIZED, 'old Password is incorrect...');
  }

  // //hash password before saving
  // const newHashesPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bycrypt_salt_rounds)
  // );
  // const updatedData = {
  //   password: newHashesPassword,
  //   needsPasswordChange: false,
  //   passwordChangeAt: new Date(),
  // };
  // // update password
  // await User.findOneAndUpdate({ id: user?.userId }, updatedData);

  //updating using save()  method
  isUserExist.password = newPassword;
  isUserExist.needsPasswordChange = false;
  isUserExist.save();
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
