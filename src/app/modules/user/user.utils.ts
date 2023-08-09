import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

// export const findlastUserID = async () => {
//   const lastUser = await User.findOne({}, { id: 1, _id: 0 })
//     .sort({
//       createdAt: -1,
//     })
//     .lean();
//   return lastUser?.id;
// };
export const findlastStudentID = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generatedStudentID = async (
  academicSemester: IAcademicSemester
): Promise<string> => {
  const currentId =
    (await findlastStudentID()) || (0).toString().padStart(5, '0'); //000000

  // increment by 1
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  // add year + code + id
  incrementId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementId}`;
  return incrementId;
};

// Faculty User
export const findlastFacultyID = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean(); // For Fast opration
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generatedFacultyID = async (): Promise<string> => {
  const currentId =
    (await findlastFacultyID()) || (0).toString().padStart(5, '0');

  // increment by 1
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  // add year + code + id
  incrementId = `F-${incrementId}`;
  return incrementId;
};

// Admin User
export const findlastAdminID = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean(); // For Fast opration
  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generatedAdminID = async (): Promise<string> => {
  const currentId =
    (await findlastAdminID()) || (0).toString().padStart(5, '0');

  // increment by 1
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  // add year + code + id
  incrementId = `A-${incrementId}`;
  return incrementId;
};
