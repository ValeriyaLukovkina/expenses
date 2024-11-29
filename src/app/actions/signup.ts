'use server';

import * as z from 'zod';
import bcrypt from 'bcrypt';

import { connectDB } from '@/lib/mongooseDB';
import { SignupSchema } from '@/Schemas';
import User from '../../Model/User';

import type { IUserDB } from '@/types/Expenses';
import { getUserByEmail } from '@/data/user';

export type SignupFormType = z.infer<typeof SignupSchema>;

const defaultCategories = [
  {
    id: 'health',
    name: 'Health',
    iconId: 'health',
    color: '#FF5722',
  },
  {
    id: 'groceries',
    name: 'Groceries',
    iconId: 'groceries',
    color: '#4CAF50',
  },
  {
    id: 'home',
    name: 'Home',
    iconId: 'travel',
    color: '#FF5722',
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    iconId: 'health',
    color: '#FF5722',
  },
  {
    id: 'education',
    name: 'Education',
    iconId: 'health',
    color: '#FF5722',
  },
];

export const signup = async (formData: SignupFormType) => {
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
    await connectDB();

    const { name, email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { errors: { error: 'User already exists' } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User<IUserDB>({
      name,
      email,
      password: hashedPassword,
      categories: defaultCategories,
      expenses: [],
    });

    await newUser.save();

    return null;
  } catch (error) {
    console.error('Error creating user:', error);
    return { errors: { error: 'Internal server error' } };
  }
};
