'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { login } from '@/app/actions/login';
import IconFacebook from '@/icons/IconFacebook/IconFacebook';
import IconGoogle from '@/icons/IconGoogle/IconGoogle';
import IconApple from '@/icons/IconApple/IconApple';
import UILink from '@/components/UI/UILink/UILink';
import Button from '@/components/UI/Button/Button';
import Input from '@/components/UI/Input/Input';
import styles from './page.module.css';

import type { LoginFormType } from '@/app/actions/login';

const Login = () => {
  const router = useRouter(); 
  const [formData, setFormData] = useState<LoginFormType>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormType, string>> | null>(null);
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
        if (res?.errors) {
          setErrors((prev) => ({ ...prev, ...res.errors }));
        } else {
          router.push('/');
        }
      });
    });
  };

  return (
    <>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome back! Glad to see you, Again!</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            className={styles.email}
            id='email'
            name='email'
            onChange={handleChange}
            disabled={isPending}
            label='Email'
            radius='s'
            size='m'
            variant='faded'
            fullWidth
          />
          <Input
            className={styles.password}
            id='password'
            name='password'
            type='password'
            onChange={handleChange}
            disabled={isPending}
            label='Password'
            radius='s'
            variant='faded'
            fullWidth
          />
          <Button
            className={styles.button}
            type='submit'
            variant='reversed'
            size='l'
            radius='s'
            fullWidth
            disabled={isPending}
          >
            Login
          </Button>
        </form>

        <div className={styles.socialsWrapper}>
          <div className={styles.divider}>
            <div className={styles.line} />
            <div className={styles.text}>Or Login with</div>
            <div className={styles.line} />
          </div>
          <div className={styles.socials}>
            <Button
              variant='bordered'
              radius='s'
              className={styles.social}
            >
              <IconFacebook />
            </Button>
            <Button variant='bordered' radius='s' className={styles.social}>
              <IconGoogle />
            </Button>
            <Button variant='bordered' radius='s' className={styles.social}>
              <IconApple />
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.register}>
        <span>Don't have an account? </span>
        <UILink href='/auth/signup' size='l' isUnderlined animated className={styles.link}>
          Register Now
        </UILink>
      </div>
    </>
  );
};

export default Login;
