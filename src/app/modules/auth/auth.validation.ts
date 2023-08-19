import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is Required',
    }),
    password: z.string({
      required_error: 'Password is Required',
    }),
  }),
});

export const authValidation = {
  loginZodSchema,
};
