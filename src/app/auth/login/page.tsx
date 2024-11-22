'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';

import { login } from '@/app/actions/login';
import Button from '@/components/UI/Button/Button';
import Input from '@/components/UI/Input/Input';

import type { LoginFormType } from '@/app/actions/login';

const Login = () => {
  const [formData, setFormData] = useState<LoginFormType>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormType, string>> | null>(null);
  const [user, setuser] = useState();
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({});

    startTransition(() => {
      login(formData).then((res) => {
        setErrors((prev) => ({ ...prev, ...res?.errors }));
      });
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          id='email'
          name='email'
          placeholder='email'
          onChange={handleChange}
          disabled={isPending}
        />
        <Input
          id='password'
          name='password'
          placeholder='password'
          onChange={handleChange}
          disabled={isPending}
        />
        <Button type='submit' theme='dark' disabled={isPending}>
          Login
        </Button>
      </form>
      {errors?.email && <div>{errors.email}</div>}
      {errors?.password && <div>{errors.password}</div>}

      <div>Or Login with</div>
      <div>
        <Button theme='white'>Google</Button>
        <Button theme='white'>Facebook</Button>
      </div>

      <Link href='/auth/signup'>Don't have an account</Link>
    </div>
  );
};

export default Login;
