import express from 'express';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { UserRouter } from '../modules/user/user.route';

const router = express.Router();

// all Router
// router.use('/users/', UserRouter);
// router.use('/academic-semesters', AcademicSemesterRouter);

const moduleRoutes = [
  { path: '/users', route: UserRouter },
  { path: '/academic-semesters', route: AcademicSemesterRouter },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
