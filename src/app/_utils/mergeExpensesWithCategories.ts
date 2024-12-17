import dayjs from 'dayjs';

import type { Dayjs } from 'dayjs';
import type { ICategory, IExpense } from '@/types/Expenses';

export interface IExpenseWithCategory extends IExpense {
  name: string;
  iconId: string;
  color: string;
}

export const mergeExpensesWithCategories = (
  expenses: IExpense[],
  categories: ICategory[],
): IExpenseWithCategory[] => {
  return expenses.map((expense) => {
    const category = categories.find((cat) => cat.id === expense.categoryId);

    return {
      ...expense,
      name: category?.name || 'Unknown',
      iconId: category?.iconId || 'unknown',
      color: category?.color || '#000000',
    };
  });
};
