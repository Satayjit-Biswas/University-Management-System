import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { glabalErrorHandler } from './app/middlewares/globalErrorHandler';
import routes from './app/routes/routes';

const app: Application = express();

// use cors
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
// app.use('/api/v1/users/', UserRouter);
// app.use('/api/v1/academic-semesters', AcademicSemesterRouter);s
app.use('/api/v1/', routes);

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

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
