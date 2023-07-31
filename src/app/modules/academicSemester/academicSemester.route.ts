import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { academicSemesteValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academicSemester',
  validateRequest(academicSemesteValidation.createacAcademicSemesteZodSchema),
  AcademicSemesterController.createSemester
);

export const AcademicSemesterRouter = router;
