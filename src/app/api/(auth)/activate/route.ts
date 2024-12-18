import { NextRequest, NextResponse } from 'next/server';

import User from '@/Model/User';
import { ValidationError } from '../../_utils/validationError';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const activationLink = searchParams.get('link');

    const user = await User.findOne({ activationLink });

    if (!user) {
      throw new ValidationError('Invalid activation link', 409);
    }

    user.isActivated = true;
    await user.save();

    return NextResponse.json({ message: 'User activated successfully' }, { status: 200 });
  } catch (error: any) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    console.error('Unhandled error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
