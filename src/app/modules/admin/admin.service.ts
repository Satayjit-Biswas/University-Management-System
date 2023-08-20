import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../interfaces/commonRes';
import { IPaginationOptions } from '../../interfaces/pagination';

import httpStatus from 'http-status';
import { apiError } from '../../../errors/apiErrors';
import { User } from '../user/user.model';
import { adminSearchableFields } from './admin.constant';
import { IAdmin, IAdminFilters } from './admin.interface';
import { Admin } from './admin.model';

const getAllAdmins = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericPaginationResponse<IAdmin[]>> => {
  // for search filter
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: adminSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i', // i  means case insencetive
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  // for  pagination

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Admin.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments();

  return {
    meta: { page, limit, total },
    data: result,
  };
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findOne({ id }).populate('managementDepartment');
  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id });
  if (!isExist) {
    throw new apiError(httpStatus.NOT_FOUND, 'Admin not Found');
  }

  const { name, ...AdminData } = payload;

  const updatedAdminData: Partial<IAdmin> = { ...AdminData };

  // dynamically handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>; // `name.firstName`
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ id }, updatedAdminData, {
    new: true,
  });
  return result;
};

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  // check if the faculty is exist
  const isExist = await Admin.findOne({ id });

  if (!isExist) {
    throw new apiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //delete student first
    const student = await Admin.findOneAndDelete({ id }, { session });
    if (!student) {
      throw new apiError(404, 'Failed to delete student');
    }
    //delete user
    await User.deleteOne({ id });
    session.commitTransaction();
    session.endSession();

    return student;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};
export const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
