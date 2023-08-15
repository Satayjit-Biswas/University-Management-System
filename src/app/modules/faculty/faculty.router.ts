import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { facultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/:id', facultyController.getSinglefaculty);
router.delete('/:id', facultyController.deleteFacultys);

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  facultyController.updatefaculty
);

router.get('/', facultyController.getAllFacultys);

export const FacultyRouter = router;
