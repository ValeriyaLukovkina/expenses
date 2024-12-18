import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { removeToken } from '../../_utils/token';

import { ValidationError } from '../../_utils/validationError';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const cookieHandler = await cookies();

    const refreshToken = cookieHandler.get('refreshToken')?.value;

    if (!refreshToken) {
      throw new ValidationError('Refresh token not found', 400);
    }

    const token = await removeToken(refreshToken);

    cookieHandler.delete('refreshToken');

    return NextResponse.json(token, { status: 200 });
  } catch (error: any) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    console.error('Unhandled error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
