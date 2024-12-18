'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import IconFacebook from '@/icons/IconFacebook/IconFacebook';
import IconGoogle from '@/icons/IconGoogle/IconGoogle';
import IconApple from '@/icons/IconApple/IconApple';
import Button from '@/components/UI/Button/Button';
import Input from '@/components/UI/Input/Input';
import UILink from '@/components/UI/UILink/UILink';
import styles from './page.module.css';
import { SignupFormType, registration } from '@/app/actions/registration';

const Signup = () => {
  const router = useRouter(); 
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

    // setErrors({});

    // registration(formData)

    startTransition(() => {
      registration(formData).then((res) => {
        if (res?.errors) {
          setErrors((prev) => ({ ...prev, ...res.errors }));
        } else {
          // router.push('/auth/login');
        }
      });
    });
  };

  return (
    <>
      <div className={styles.content}>
        <h1 className={styles.title}>Hello! Register to get started</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            className={styles.name}
            id='name'
            name='name'
            onChange={handleChange}
            disabled={isPending}
            label='Name'
            radius='s'
            size='m'
            variant='faded'
            fullWidth
          />
          <Input
            className={styles.email}
            id='email'
            name='email'
            onChange={handleChange}
            disabled={isPending}
            label='Email'
            radius='s'
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
          <Input
            className={styles.repeatPassword}
            id='repeatPassword'
            name='repeatPassword'
            type='password'
            onChange={handleChange}
            disabled={isPending}
            label='Repeat password'
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
            Register
          </Button>
        </form>

        <div className={styles.socialsWrapper}>
          <div className={styles.divider}>
            <div className={styles.line} />
            <div className={styles.text}>Or Register with</div>
            <div className={styles.line} />
          </div>
          <div className={styles.socials}>
            <Button variant='bordered' radius='s' className={styles.social}>
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
        <span>Already have an account? </span>
        <UILink href='/auth/login' size='l' isUnderlined animated className={styles.link}>
          Login Now
        </UILink>
      </div>
    </>
  );
};

export default Signup;
