import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';

import { generateToken, saveToken } from '../../_utils/token';
import User from '@/Model/User';

import type { IDto } from '../../_utils/token';
import { ValidationError } from '../../_utils/validationError';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      throw new ValidationError('Email, and password are required');
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new ValidationError('User not found', 400);
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      throw new ValidationError('Invalid password', 400);
    }

    const userDto: IDto = {
      name: existingUser.name,
      email: existingUser.email,
      id: existingUser._id.toString(),
      isActivated: existingUser.isActivated,
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
