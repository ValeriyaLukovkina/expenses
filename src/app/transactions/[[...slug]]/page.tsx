'use client';
import { FC, use, useMemo } from 'react';

import dateStore from '@/store/dateStore';
import expensesStore from '@/store/expensesStore';
import categoriesStore from '@/store/categoriesStore';
import { filterExpensesByPeriod } from '../../_utils/filteredExpensesByPeriod';
import { mergeExpensesWithCategories } from '../../_utils/mergeExpensesWithCategories';
import IconDownload from '@/icons/IconDownload/IconDownload';
import Header from '@/components/Header/Header';
import TimeFilter from '@/components/TimeFilter/TimeFilter';
import List from '@/components/UI/List/List';
import TransactionItem from '@/components/TransactionItem/TransactionItem';

import styles from './page.module.css';
import { sortExpenses } from '@/app/_utils/sortExpenses';

interface TransactionsProps {
  params: Promise<{ slug: string[] }>;
}

const Transactions: FC<TransactionsProps> = ({ params }) => {
  const { slug } = use(params);
  const categoryId = slug?.[0];

  const { selectPeriod, selectDate, startDate, endDate } = dateStore();
  const { expenses, sort } = expensesStore();
  const { categories } = categoriesStore();

  const сategoryExpenses = useMemo(() => {
    const filteredExpenses = filterExpensesByPeriod(expenses, startDate, endDate);
    const sortedExpenses = sortExpenses(filteredExpenses, sort);
    console.log(filteredExpenses);
    // return mergeExpensesWithCategories(filteredExpenses, categories);
  }, [categories, expenses, selectDate, selectPeriod]);
  console.log(сategoryExpenses);

  return (
    <div>
      <Header
        name='Transactions'
        additional={
          <div className={styles.additional}>
            <IconDownload className={styles.icon} />
          </div>
        }
      />
      <main className={styles.container}>
        {categoryId && <TimeFilter />}
        {сategoryExpenses?.length > 0 && (
          <List className={styles.list}>
            {сategoryExpenses.map((category) => {
              return <TransactionItem key={category.id} category={category} />;
            })}
          </List>
        )}
      </main>
    </div>
  );
};

export default Transactions;
