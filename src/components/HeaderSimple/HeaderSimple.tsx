'use client';

import { useRouter } from 'next/navigation';

import IconArrow from '@/icons/IconArrow/IconArrow';
import styles from './HeaderSimple.module.css';

import type { FC } from 'react';

interface HeaderSimpleProps {
  name: string;
}

const HeaderSimple: FC<HeaderSimpleProps> = (props) => {
  const { name, ...restProps } = props;
  const router = useRouter();

  return (
    <div className={styles.header} {...restProps}>
      <button className={styles.backButton} onClick={() => router.back()}>
        <IconArrow className={styles.icon} />
      </button>
      <h1 className={styles.title}>{name}</h1>
    </div>
  );
};

export default HeaderSimple;
