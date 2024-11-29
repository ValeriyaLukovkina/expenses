'use client';

import cn from 'classnames';

import { icons } from '@/data/expenses';
import styles from './TransactionItem.module.css';

import type { FC } from 'react';
import type { ICategoryExpense } from '@/app/_utils/calculateCategoryStats';

interface TransactionItemProps {
  className?: string;
  category: ICategoryExpense;
}

const TransactionItem: FC<TransactionItemProps> = (props) => {
  const { className, category, ...restProps } = props;

  const IconComponent = icons[category.iconId]?.Component;

  return (
    <div className={cn(styles.item, className)} {...restProps}>
      <div className={styles.category}>
        <div className={styles.iconWrapper} style={{ 'backgroundColor': category.color }}>
          <IconComponent className={styles.icon} />
        </div>
        <div className={styles.name}>{category.name}</div>
      </div>
      <div className={styles.percentage}>{category.percentage} %</div>
      <div className={styles.amount}>{category.total}</div>
    </div>
  );
};

export default TransactionItem;
