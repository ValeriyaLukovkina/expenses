'use server';

import * as z from 'zod';

import { LoginSchema } from '@/Schemas';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { connectToDatabase } from '@/lib/mongooseDB';

export type LoginFormType = z.infer<typeof LoginSchema>;

export const login = async (formData: LoginFormType) => {
  const validatedFields = LoginSchema.safeParse(formData);
  if (!validatedFields.success) {
    const validationErrors: Partial<Record<keyof LoginFormType, string>> = {};
    validatedFields.error.errors.forEach((err) => {
      if (err.path[0] in formData) {
        validationErrors[err.path[0] as keyof LoginFormType] = err.message;
      }
    });
    return { errors: validationErrors };
  }

  const { email, password } = validatedFields.data;

  try {
    await connectToDatabase();

    await signIn('credentials', { email, password, redirect: false });

    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { errors: { error: 'Invalid credentials' } };
        default:
          return { errors: { error: 'Something went wrong' } };
      }
    }
    return { errors: { error: 'Internal server error' } };
  }
};
