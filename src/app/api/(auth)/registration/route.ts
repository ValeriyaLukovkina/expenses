import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';

import { generateToken, saveToken } from '../../_utils/token';
import User from '@/Model/User';

import type { IDto } from '../../_utils/token';
import { sendActivationMail } from '../../_utils/sendActivationMail';
import { ValidationError } from '../../_utils/validationError';

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

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      throw new ValidationError('Name, email, and password are required');
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ValidationError('User already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const activationLink = uuid.v4();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      activationLink,
      categories: defaultCategories,
      expenses: [],
    });

    await sendActivationMail(email, `${process.env.BASE_URL}/api/activate?link=${activationLink}`);

    const userDto: IDto = {
      name: user.name,
      email: user.email,
      id: user._id.toString(),
      isActivated: user.isActivated,
    };

    const tokens = generateToken(userDto);

    await saveToken(userDto.id, tokens.refreshToken);

    const cookieHandler = await cookies();
    cookieHandler.set('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return NextResponse.json(userDto, { status: 200 });
  } catch (error: any) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    console.error('Unhandled error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
