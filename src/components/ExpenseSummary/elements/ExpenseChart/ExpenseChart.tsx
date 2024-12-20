import { useMemo } from 'react';
import cn from 'classnames';

import categoriesStore from '@/store/categoriesStore';
import expensesStore from '@/store/expensesStore';
import dateStore from '@/store/dateStore';
import { filterExpensesByPeriod } from '@/app/_utils/filteredExpensesByPeriod';
import { getExpensesSum } from '@/app/_utils/getExpensesSum';
import { calculateCategoryStats } from '@/app/_utils/calculateCategoryStats';
import CircleChart from '@/components/UI/CircleChart/CircleChart';
import styles from './ExpenseChart.module.css';

import type { FC } from 'react';
import type { ICategoryStats } from '@/app/_utils/calculateCategoryStats';

interface ExpenseChartProps {
  className?: string;
}

const ExpenseChart: FC<ExpenseChartProps> = (props) => {
  const { className } = props;

  const { categories } = categoriesStore();
  const { expenses } = expensesStore();
  const { selectPeriod, selectDate, startDate, endDate } = dateStore();

  const сategoryExpenses = useMemo((): ICategoryStats[] => {
    const filteredExpenses = filterExpensesByPeriod(expenses, startDate, endDate);
    const totalFilteredExpenses = getExpensesSum(filteredExpenses);

    return calculateCategoryStats(categories, filteredExpenses, totalFilteredExpenses);
  }, [categories, expenses, selectDate, selectPeriod, startDate, endDate]);
  console.log(сategoryExpenses);
  debugger

  return (
    <div className={cn(styles.timePeriod, className)}>
      {сategoryExpenses?.length > 0 ? (
        <CircleChart data={сategoryExpenses} />
      ) : (
        <div className={styles.emptyChart}>
          <div>No data</div>
        </div>
      )}
    </div>
  );
};

export default ExpenseChart;
