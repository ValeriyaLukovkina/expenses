import bcrypt from 'bcrypt';

import { connectToDatabase } from '@/lib/mongooseDB';
import User from '../../../Model/User';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { IUser } from '@/types/Expenses';

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    await connectToDatabase();

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User<IUser>({
      name,
      email,
      password: hashedPassword,
      categories: defaultCategories,
      expenses: [],
    });

    await newUser.save();

    return res.status(201).json({ message: 'User successfully created' });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
