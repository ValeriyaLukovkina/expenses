import { auth } from '@/auth';
import { connectDB } from '@/lib/mongooseDB';
import User from '@/Model/User';

import type { IUserDB } from '@/types/Expenses';

export async function getUser(): Promise<IUserDB> {
  try {
    const session = await auth();

    if (!session) {
      throw new Error('Unauthorized');
    }
    await connectDB();

    if (!session.user?.email) {
      throw new Error('Email must not be null or undefined');
    }

    const email = session.user.email;
    const user = await User.findOne({ email })
      .select('-categories._id -_id -password -__v')
      .lean<IUserDB>();

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.error('Error in getUser:', error);
    throw error;
  }
}
