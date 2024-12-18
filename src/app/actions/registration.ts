'use server';

import * as z from 'zod';

import { SignupSchema } from '@/Schemas';

export type SignupFormType = z.infer<typeof SignupSchema>;

export const registration = async (formData: SignupFormType) => {
  const validatedFields = SignupSchema.safeParse(formData);
  if (!validatedFields.success) {
    const validationErrors: Partial<Record<keyof SignupFormType, string>> = {};
    validatedFields.error.errors.forEach((err) => {
      if (err.path[0] in formData) {
        validationErrors[err.path[0] as keyof SignupFormType] = err.message;
      }
    });
    return { errors: validationErrors };
  }

  try {
    const { name, email, password } = validatedFields.data;
    const response = await fetch('http://localhost:3000/api/registration', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      return {
        errors: null,
      };
    }
  } catch (error) {
    console.error('Error creating user:', error);
    return { errors: { error: 'Internal server error' } };
  }
};
