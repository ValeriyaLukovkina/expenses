'use client';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import categoriesStore from '@/store/categoriesStore';
import expensesStore from '@/store/expensesStore';
import dateStore from '@/store/dateStore';
import { calculateCategoryStats } from '@/app/_utils/calculateCategoryStats';
import { filterExpensesByPeriod } from '@/app/_utils/filteredExpensesByPeriod';
import { getExpensesSum } from '@/app/_utils/getExpensesSum';
import IconTransactions from '@/icons/IconTransactions/IconTransactions';
import Header from '@/components/Header/Header';
import ExpenseSummary from '@/components/ExpenseSummary/ExpenseSummary';
import List from '@/components/UI/List/List';
import TransactionItem from '@/components/TransactionItem/TransactionItem';
import styles from './page.module.css';

import type { ICategoryStats } from '@/app/_utils/calculateCategoryStats';

const Main = () => {
  const router = useRouter();
  const { categories } = categoriesStore();
  const { expenses } = expensesStore();
  const { selectPeriod, selectDate, startDate, endDate } = dateStore();

  const сategoryExpenses = useMemo((): ICategoryStats[] => {
    const filteredExpenses = filterExpensesByPeriod(expenses, startDate, endDate);
    const totalFilteredExpenses = getExpensesSum(filteredExpenses);

    return calculateCategoryStats(categories, filteredExpenses, totalFilteredExpenses);
  }, [categories, expenses, selectDate, selectPeriod]);

  const handleClick = useCallback(
    (categoryId: string) => {
      router.push(`/transactions/${categoryId}`);
    },
    [router],
  );

  return (
    <div>
      <Header
        name='Main'
        additional={
          <Link href='/transactions' className={styles.additional}>
            {<IconTransactions className={styles.icon} />}
          </Link>
        }
      />
      <div className={styles.content}>
        <div className={styles.expenseSummary}>
          <ExpenseSummary />
        </div>

        <List className={styles.list} view='splitted'>
          {сategoryExpenses.map((category) => {
            if (category.amount > 0) {
              return (
                <TransactionItem
                  key={category.id}
                  category={category}
                  className={styles.transaction}
                  onClick={() => handleClick(category.id)}
                />
              );
            }
          })}
        </List>
      </div>
    </div>
  );
};

export default Main;
