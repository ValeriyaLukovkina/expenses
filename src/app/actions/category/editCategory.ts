'use server';

import * as z from 'zod';

import { CategorySchema } from '@/Schemas';
import { headers } from 'next/headers';

export type CategoryFormType = z.infer<typeof CategorySchema>;

export const editCategory = async (formData: CategoryFormType, id: string) => {
  const validatedFields = CategorySchema.safeParse(formData);

  if (!validatedFields.success) {
    const validationErrors: Partial<Record<keyof CategoryFormType, string>> = {};
    validatedFields.error.errors.forEach((err) => {
      if (err.path[0] in formData) {
        validationErrors[err.path[0] as keyof CategoryFormType] = err.message;
      }
    });
    return { errors: validationErrors };
  }

  try {
    const headersList = await headers();

    const response = await fetch(`http://localhost:3000/api/categories/edit?id=${id}`, {
      method: 'PUT',
      headers: {
        cookie: headersList.get('cookie') || '',
      },
      credentials: 'include',
      body: JSON.stringify({
        updatedData: {
          ...formData,
          id: formData.name,
          limit: formData.limit && formData.limit > 0 ? formData.limit : null,
        },
      }),
    });

    console.log

    if (!response.ok) {
      return { errors: { error: 'Internal server error' } };
    }

    return null;
  } catch (error) {
    console.error('Error editing category:', error);
    return { errors: { error: 'Internal server error' } };
  }
};