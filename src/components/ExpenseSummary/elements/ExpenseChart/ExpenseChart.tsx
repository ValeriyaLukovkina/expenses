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
import type { Dayjs } from 'dayjs';
import type { ICategoryExpense } from '@/app/_utils/calculateCategoryStats';

interface ExpenseChartProps {
  className?: string;
}

const ExpenseChart: FC<ExpenseChartProps> = (props) => {
  const { className } = props;

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
    <div className={cn(styles.timePeriod, className)}>
      <CircleChart data={сategoryExpenses} />
    </div>
  );
};

export default ExpenseChart;
