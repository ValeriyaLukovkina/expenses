'use client';

import styles from './TransactionItem.module.css';

import type { FC } from 'react';
import type { ICategory } from '@/types/Expenses';

interface TransactionItemProps {
  className?: string;
  category: ICategory;
}

const TransactionItem: FC<TransactionItemProps> = (props) => {
  const { className, category, ...restProps } = props;

  return (
    <div {...restProps}>
      <div>
        <div></div>
        <div className={styles.name}></div>
      </div>
    </div>
  );
};

export default TransactionItem;
