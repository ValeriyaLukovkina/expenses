import { NextRequest, NextResponse } from 'next/server';

import User from '@/Model/User';
import { ensureSession } from '../_utils/ensureSession';

import type { IUserDB } from '@/types/Expenses';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session = await ensureSession();

    if (!session.user?.email) {
      return NextResponse.json({ message: 'Email must not be null or undefined' }, { status: 400 });
    }

    const email: string = session.user.email;
    const user: IUserDB | null = await User.findOne({ email })
      .select('-categories._id -_id -password -__v')
      .lean<IUserDB>();

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user , { status: 200 });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
