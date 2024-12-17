import dayjs from 'dayjs';

import type { Dayjs } from 'dayjs';
import type { IExpense } from '@/types/Expenses';

export const filterExpensesByPeriod = (
  expenses: IExpense[],
  startDate: Dayjs,
  endDate: Dayjs,
): IExpense[] => {
  return expenses.filter((expense) => {
    const expenseDate = dayjs(expense.date);
    return expenseDate.isAfter(startDate) && expenseDate.isBefore(endDate);
  });
};
