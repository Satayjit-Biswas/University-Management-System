import express from 'express';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { UserRouter } from '../modules/user/user.route';

const router = express.Router();

// all Router
// router.use('/users/', UserRouter);
// router.use('/academic-semesters', AcademicSemesterRouter);

const moduleRoutes = [
  { path: '/users', route: UserRouter },
  { path: '/academic-semesters', route: AcademicSemesterRouter },
  { path: '/academic-faculty', route: AcademicFacultyRouter },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
