import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constant';
import { IStudent } from './student.interface';
import { AcademicStudentService } from './student.service';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  // For pagination

  const paginationOptions = pick(req.query, paginationFields);
  const result = await AcademicStudentService.getAllStudents(
    filters,
    paginationOptions
  );

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicStudentService.getSingleStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully!',
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AcademicStudentService.updateStudent(id, updatedData);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully!',
    data: result,
  });
});

const deleteStudents = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicStudentService.deleteStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Delete successfully!',
    data: result,
  });
});

export const StudentController = {
  getSingleStudent,
  deleteStudents,
  getAllStudents,
  updateStudent,
};
