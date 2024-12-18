'use server';

import * as z from 'zod';

import { LoginSchema } from '@/Schemas';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { connectDB } from '@/lib/mongooseDB';

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

  try {
    const { email, password } = validatedFields.data;

    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      return {
        errors: null,
      };
    }
  } catch (error) {
    console.error('Error logging in:', error);

    return { errors: { error: 'Internal server error' } };
  }
};
