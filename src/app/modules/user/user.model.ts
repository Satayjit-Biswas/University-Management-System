import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config/config';
import { IUser, IUserMethods, UserModel } from './user.interface';

const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// frist time change password Notification
userSchema.methods.isUserExist = async function (
  id: string
): Promise<Partial<IUser> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
  );
};

userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// hash password after save

userSchema.pre('save', async function (next) {
  // hash password

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
