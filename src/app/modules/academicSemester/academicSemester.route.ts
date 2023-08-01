import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academicsemester',
  validateRequest(academicSemesterValidation.createacAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

export const AcademicSemesterRouter = router;
