import { auth } from '@/auth';
import { connectDB } from '@/lib/mongooseDB';
import { getUserByEmail } from '@/data/user';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest, res: NextResponse) {
  const cookieStore = await cookies();
  const session = await auth();
  console.log('api', session);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();

    if (!session.user?.email) {
      throw new Error('Email must not be null or undefined');
    }

    const user = await getUserByEmail(session.user.email);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const { password, ...userData } = user;

    return NextResponse.json(userData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
