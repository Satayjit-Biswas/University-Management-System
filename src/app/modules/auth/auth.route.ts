import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { authValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidation.loginZodSchema),
  AuthController.loginUser
);
// router.delete('/:id', facultyController.deleteFacultys);

// router.patch(
//   '/:id',
//   validateRequest(FacultyValidation.updateFacultyZodSchema),
//   facultyController.updatefaculty
// );

// router.get('/', facultyController.getAllFacultys);

export const AuthRouter = router;
