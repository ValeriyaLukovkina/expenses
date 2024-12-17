'use client';

import cn from 'classnames';

import { icons } from '@/data/expenses';
import styles from './TransactionItem.module.css';

import type { FC } from 'react';

interface ICategory {
  id: string;
  name: string;
  iconId: string;
  color: string;
  amount: number;
  percentage?: number;
}

interface TransactionItemProps {
  className?: string;
  category: ICategory;
  onClick?: () => void;
}

const TransactionItem: FC<TransactionItemProps> = (props) => {
  const { className, category, onClick, ...restProps } = props;

  const IconComponent = icons[category.iconId]?.Component;

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div className={cn(styles.item, className)} onClick={handleClick} {...restProps}>
      <div className={styles.category}>
        <div className={styles.iconWrapper} style={{ backgroundColor: category.color }}>
          <IconComponent className={styles.icon} />
        </div>
        <div className={styles.name}>{category.name}</div>
      </div>
      {category.percentage && <div className={styles.percentage}>{category.percentage} %</div>}
      <div className={styles.amount}>{category.amount}</div>
    </div>
  );
};

export default TransactionItem;
