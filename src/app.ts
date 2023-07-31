import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { glabalErrorHandler } from './app/middlewares/globalErrorHandler';
import { AcademicSemesterRouter } from './app/modules/academicSemester/academicSemester.route';
import { UserRouter } from './app/modules/user/user.route';

const app: Application = express();

// use cors
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
app.use('/api/v1/users/', UserRouter);
app.use('/api/v1/academic-semesters', AcademicSemesterRouter);

// // Testing welcome route
app.get('/', (req: Request, res: Response) => {
  res.json('Welcome to University-Management-System API.........!');
});

// Error Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   Promise.reject(new Error('Unhandled Promise Rehjection'))
// })

//global error handler
app.use(glabalErrorHandler);

export default app;
