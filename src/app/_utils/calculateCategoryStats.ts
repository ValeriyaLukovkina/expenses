import { ICategory, IExpense } from '../../types/Expenses';

export interface ICategoryExpense {
  id: string;
  name: string;
  iconId: string;
  color: string;
  total: number;
  percentage: number;
}

export const calculateCategoryStats = (
  categories: ICategory[],
  expenses: IExpense[],
  totalExpenses: number,
): ICategoryExpense[] => {
  const groupedExpenses = expenses.reduce<Record<string, number>>((acc, expense) => {
    acc[expense.categoryId] = (acc[expense.categoryId] || 0) + expense.amount;
    return acc;
  }, {});

  return categories.map((category) => {
    const total = groupedExpenses[category.id] || 0;
    const percentage = totalExpenses ? (total / totalExpenses) * 100 : 0;

    return {
      id: category.id,
      name: category.name,
      iconId: category.iconId,
      color: category.color,
      total,
      percentage: parseFloat(percentage.toFixed(2)),
    };
  });
};
