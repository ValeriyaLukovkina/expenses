import { auth } from '@/auth';
import { Session } from 'next-auth';

export const ensureSession = async (): Promise<Session> => {
  const session = await auth();

  if (!session) {
    throw new Error('Unauthorized');
  }

  return session;
};
