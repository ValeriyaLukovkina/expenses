'use server';

import * as z from 'zod';

import { CategorySchema } from '@/Schemas';
import { headers } from 'next/headers';

export type CategoryFormType = z.infer<typeof CategorySchema>;

export const deleteCategory = async (id: string) => {
  try {
    const headersList = await headers();

    const response = await fetch(`http://localhost:3000/api/categories/delete?id=${id}`, {
      method: 'DELETE',
      headers: {
        cookie: headersList.get('cookie') || '',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      return { errors: { error: 'Internal server error' } };
    }

    return null;
  } catch (error) {
    console.error('Error editing category:', error);
    return { errors: { error: 'Internal server error' } };
  }
};
