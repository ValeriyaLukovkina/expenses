'use client';

import { SignupFormType, signup } from '@/app/actions/signup';
import Button from '@/components/UI/Button/Button';
import Input from '@/components/UI/Input/Input';
import Link from 'next/link';
import { useState, useTransition } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState<SignupFormType>({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormType, string>> | null>(null);
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
      signup(formData).then((res) => {
        setErrors((prev) => ({ ...prev, ...res?.errors }));
      });
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          id='name'
          name='name'
          placeholder='name'
          onChange={handleChange}
          disabled={isPending}
        />
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
        <Input
          id='repeatPassword'
          name='repeatPassword'
          placeholder='password'
          onChange={handleChange}
          disabled={isPending}
        />
        <Button type='submit' theme='dark' disabled={isPending}>
          Sign up
        </Button>
      </form>

      {errors?.name && <div>{errors.name}</div>}
      {errors?.email && <div>{errors.email}</div>}
      {errors?.password && <div>{errors.password}</div>}

      <Link href='/auth/login'>Already have an account</Link>
    </div>
  );
};

export default Signup;
