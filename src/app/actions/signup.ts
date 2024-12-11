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
    iconId: 'heart',
    color: '#E91E63',
  },
  {
    id: 'groceries',
    name: 'Groceries',
    iconId: 'flatware',
    color: '#4CAF50',
  },
  {
    id: 'home',
    name: 'Home',
    iconId: 'home',
    color: '#03A9F4',
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    iconId: 'flatware',
    color: '#FF9800',
  },
  {
    id: 'travel',
    name: 'Travel',
    iconId: 'plane',
    color: '#00BCD4',
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

    const savedUser = await newUser.save();

    if (!savedUser) {
      return { errors: { error: 'Something went wrong' } };
    }
    
    return null;
  } catch (error) {
    console.error('Error creating user:', error);
    return { errors: { error: 'Internal server error' } };
  }
};
