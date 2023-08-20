import express from 'express';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { AdminRouter } from '../modules/admin/admin.router';
import { AuthRouter } from '../modules/auth/auth.route';
import { FacultyRouter } from '../modules/faculty/faculty.router';
import { ManagementDepartmentRouter } from '../modules/managementDepartment/managementDepartment.route';
import { StudentRouter } from '../modules/student/student.router';
import { UserRouter } from '../modules/user/user.route';

const router = express.Router();

// all Router
// router.use('/users/', UserRouter);
// router.use('/academic-semesters', AcademicSemesterRouter);

const moduleRoutes = [
  { path: '/users', route: UserRouter },
  { path: '/auth', route: AuthRouter },
  { path: '/academic-semesters', route: AcademicSemesterRouter },
  { path: '/academic-faculty', route: AcademicFacultyRouter },
  { path: '/academic-department', route: AcademicDepartmentRouter },
  { path: '/management-department', route: ManagementDepartmentRouter },
  { path: '/students', route: StudentRouter },
  { path: '/faculties', route: FacultyRouter },
  { path: '/admins', route: AdminRouter },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
