import dayjs from 'dayjs';

import type { IExpense } from '@/types/Expenses';

export const sortExpenses = (expenses: IExpense[], sortBy: 'date' | 'amount'): IExpense[] => {
  return expenses.sort((a: IExpense, b: IExpense): number => {
    if (sortBy === 'date') {
      return dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1;
    } else if (sortBy === 'amount') {
      return a.amount - b.amount;
    }

    return 0;
  });
};
