import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '@/lib/mongooseDB';
import User from '@/Model/User';
import { ensureSession } from '../../_utils/ensureSession';

import type { UpdateWriteOpResult } from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    const session = await ensureSession();
    await connectDB();

    if (!session.user?.email) {
      return NextResponse.json({ message: 'Email must not be null or undefined' }, { status: 400 });
    }

    const email: string = session.user.email;
    const body = await req.json();

    if (!body.newCategory) {
      return NextResponse.json(
        { message: 'New category must not be null or undefined' },
        { status: 400 },
      );
    }

    const result: UpdateWriteOpResult = await User.updateOne(
      { email },
      { $push: { categories: body.newCategory } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Categories updated successfully' }, { status: 200 });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}