import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config/config';
import { apiError } from '../../../errors/apiErrors';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generatedAdminID,
  generatedFacultyID,
  generatedStudentID,
} from './user.utils';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  // // hash password

  // user.password = await bcrypt.hash(
  //   user.password,
  //   Number(config.bycrypt_salt_rounds)
  // );

  //set role
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  // generate student id

  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const id = await generatedStudentID(academicSemester as IAcademicSemester);

    user.id = id;
    student.id = id;

    //array
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new apiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    //set student -->  _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new apiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  // user ---> student ----> academicSemester , academicDepartment , academicFaculty
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicDepartment' },
        { path: 'academicFaculty' },
      ],
    });
  }
  return newUserAllData;
};

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }
  //set role
  user.role = 'faculty';

  // generate student id

  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const id = await generatedFacultyID();

    user.id = id;
    faculty.id = id;

    //array
    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new apiError(httpStatus.BAD_REQUEST, 'Failed to create Faculty');
    }

    //set faculty -->  _id into user.faculty
    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new apiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  // user ---> student ----> academicSemester , academicDepartment , academicFaculty
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [{ path: 'academicDepartment' }, { path: 'academicFaculty' }],
    });
  }
  return newUserAllData;
};

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }
  //set role
  user.role = 'admin';

  // generate student id

  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const id = await generatedAdminID();

    user.id = id;
    admin.id = id;

    //array
    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new apiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    //set faculty -->  _id into user.faculty
    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new apiError(httpStatus.BAD_REQUEST, 'Failed to create admin user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  // user ---> student ----> academicSemester , academicDepartment , academicFaculty
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [{ path: 'managementDepartment' }],
    });
  }
  return newUserAllData;
};
export default {
  createStudent,
  createFaculty,
  createAdmin,
};
