import { IExpense } from '../../types/Expenses';
import { getExpensesSum } from './getExpensesSum';

export function calculateCategoryPercentage(
  expenses: IExpense[],
  categoryId: string,
  totalExpenses: number,
) {
  const categoryExpenses = expenses.filter((expense) => expense.categoryId === categoryId);

  const totalCategoryAmount = getExpensesSum(categoryExpenses);

  const percentage = (totalCategoryAmount / totalExpenses) * 100;

  return { totalCategoryAmount, percentage };
}
