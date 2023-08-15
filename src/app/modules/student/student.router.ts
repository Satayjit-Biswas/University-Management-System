import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidaion } from './student.validation';

const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
router.delete('/:id', StudentController.deleteStudents);

router.patch(
  '/:id',
  validateRequest(StudentValidaion.updateStudentZodSchema),
  StudentController.updateStudent
);

router.get('/', StudentController.getAllStudents);

export const StudentRouter = router;
