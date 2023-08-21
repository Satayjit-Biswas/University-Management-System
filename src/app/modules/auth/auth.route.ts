import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { authValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  '/refresh-token',
  validateRequest(authValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);
router.post(
  '/change-password',
  validateRequest(authValidation.changePasswordZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  AuthController.changePassword
);
// router.delete('/:id', facultyController.deleteFacultys);

// router.patch(
//   '/:id',
//   validateRequest(FacultyValidation.updateFacultyZodSchema),
//   facultyController.updatefaculty
// );

// router.get('/', facultyController.getAllFacultys);

export const AuthRouter = router;
