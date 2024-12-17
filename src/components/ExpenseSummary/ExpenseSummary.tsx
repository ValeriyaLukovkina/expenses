'use client';
import Link from 'next/link';

import IconPlus from '@/icons/IconPlus';
import TimeFilter from '../TimeFilter/TimeFilter';
import ExpenseChart from './elements/ExpenseChart/ExpenseChart';
import styles from './ExpenseSummary.module.css';

import type { FC } from 'react';

interface ExpenseSummaryProps {
  className?: string;
}

const ExpenseSummary: FC<ExpenseSummaryProps> = (props) => {
  const { className, ...restProps } = props;


  return (
    <div className={styles.wrapper} {...restProps}>
      <TimeFilter />
      <ExpenseChart className={styles.expenseChart} />
      <Link href={'/expenses/create'} className={styles.add}>
        <IconPlus className={styles.plus} />
      </Link>
    </div>
  );
};

export default ExpenseSummary;
