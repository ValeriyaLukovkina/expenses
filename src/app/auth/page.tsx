'use client';

import { useRouter } from 'next/navigation';
import Button from '../../components/UI/Button/Button';
import { useCallback } from 'react';

const Auth = () => {
  const router = useRouter();

  const handleLogin = useCallback(() => {
    router.push('/auth/login');
  }, [router]);

  const handleRegister = useCallback(() => {
    router.push('/auth/signup');
  }, [router]);

  return (
    <div>
      <div>Sign up or login</div>
      <Button theme='dark' onClick={handleLogin}>Login</Button>
      <Button theme='white' onClick={handleRegister}>Register</Button>

      <Button theme="white">Continue as a guest</Button>
    </div>
  );
};

export default Auth;
