import httpStatus from 'http-status';
import { apiError } from '../../../errors/apiErrors';
import { User } from '../user/user.model';
import { IloginUser } from './auth.interface';

const loginUser = async (payload: IloginUser) => {
  const { id, password } = payload;
  // check user exist
  // const isUSerExist = await User.findOne(
  //   { id },
  //   { id: 1, password: 1, needsPasswordChange: 1 }
  // ).lean();

  const user = new User();
  const isUserExist = await user.isUserExist(id);

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
    !user.isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new apiError(
      httpStatus.UNAUTHORIZED,
      'Your Password is not Matched...'
    );
  }

  // create access token

  return {};
};

export const AuthService = {
  loginUser,
};
