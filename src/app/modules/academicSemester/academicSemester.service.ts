import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import { apiError } from '../../../errors/apiErrors';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../interfaces/commonRes';
import { IPaginationOptions } from '../../interfaces/pagination';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new apiError(httpStatus.BAD_REQUEST, 'Invalid Semenster Code...');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllsemesters = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericPaginationResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: { page, limit, total },
    data: result,
  };
};

export const AcademicSemesterService = {
  createSemester,
  getAllsemesters,
};
