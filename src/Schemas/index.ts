import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string({ message: 'Password is required' }),
});

export const SignupSchema = z.object({
  name: z.string({ message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  repeatPassword: z.string().min(6),
});

export const CategorySchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  limit: z.number().optional(),
  iconId: z.string().min(1, { message: 'Icon is required' }),
  color: z.string().min(1, { message: 'Color is required' }),
});
