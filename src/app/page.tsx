'use client';
import { useMemo } from 'react';

import categoriesStore from '@/store/categoriesStore';
import expensesStore from '@/store/expensesStore';
import dateStore from '@/store/dateStore';
import { ICategoryExpense, calculateCategoryStats } from '@/app/_utils/calculateCategoryStats';
import { filterExpensesByPeriod } from '@/app/_utils/filteredExpensesByPeriod';
import { getExpensesSum } from '@/app/_utils/getExpensesSum';
import Header from '@/components/Header/Header';
import ExpenseSummary from '@/components/ExpenseSummary/ExpenseSummary';
import List from '@/components/UI/List/List';
import TransactionItem from '@/components/TransactionItem/TransactionItem';
import styles from './page.module.css';

import type { Dayjs } from 'dayjs';

const Main = () => {
  const { categories } = categoriesStore();
  const { expenses } = expensesStore();
  const { selectPeriod, selectDate } = dateStore();

  const сategoryExpenses = useMemo((): ICategoryExpense[] => {
    let startDate: Dayjs;
    let endDate: Dayjs;

    switch (selectPeriod) {
      case 'day':
        startDate = selectDate.startOf('day');
        endDate = selectDate.endOf('day');
        break;
      case 'week':
        startDate = selectDate.startOf('isoWeek');
        endDate = selectDate.endOf('isoWeek');
        break;
      case 'month':
        startDate = selectDate.startOf('month');
        endDate = selectDate.endOf('month');
        break;
      case 'year':
        startDate = selectDate.startOf('year');
        endDate = selectDate.endOf('year');
        break;
      default:
        startDate = selectDate.startOf('day');
        endDate = selectDate.endOf('day');
    }

    const filteredExpenses = filterExpensesByPeriod(expenses, startDate, endDate);
    const totalFilteredExpenses = getExpensesSum(filteredExpenses);

    return calculateCategoryStats(categories, filteredExpenses, totalFilteredExpenses);
  }, [categories, expenses, selectDate, selectPeriod]);

  return (
    <div>
      <Header name='Main' additional={<div>111</div>} />
      <div className={styles.content}>
        <div className={styles.expenseSummary}>
          <ExpenseSummary />
        </div>

        <List className={styles.list} view='splitted'>
          {сategoryExpenses.map((category) => {
            if (category.total > 0) {
              return <TransactionItem key={category.id} category={category} />;
            }
          })}
        </List>
      </div>
    </div>
  );
};

export default Main;
