import { IExpense } from '../../types/Expenses';

export const getExpensesSum = (expenses: IExpense[]) => {
  return expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
};
