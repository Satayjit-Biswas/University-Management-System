import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterTitles,
  acdemicSemesterMonths,
} from './academicSemester.constant';

const createacAcademicSemesteZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'Year is required',
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
      required_error: 'Code is required',
    }),
    starMonth: z.enum([...acdemicSemesterMonths] as [string, ...string[]], {
      required_error: 'startMonth is required',
    }),
    endMonth: z.enum([...acdemicSemesterMonths] as [string, ...string[]], {
      required_error: 'endMonth is required',
    }),
  }),
});

// await createUserZodSchema.parseAsync(req)

export const academicSemesteValidation = {
  createacAcademicSemesteZodSchema,
};
