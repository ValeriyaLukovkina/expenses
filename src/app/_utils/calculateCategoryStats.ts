import { ICategory, IExpense } from '../../types/Expenses';

export interface ICategoryStats extends ICategory {
  amount: number;
  percentage: number;
}

export const calculateCategoryStats = (
  categories: ICategory[],
  expenses: IExpense[],
  totalExpenses: number,
): ICategoryStats[] => {
  const groupedExpenses = expenses.reduce<Record<string, number>>((acc, expense) => {
    acc[expense.categoryId] = (acc[expense.categoryId] || 0) + expense.amount;
    return acc;
  }, {});

  return categories.reduce<ICategoryStats[]>((result, category) => {
    const total = groupedExpenses[category.id] || 0;
    const percentage = totalExpenses ? (total / totalExpenses) * 100 : 0;

    if (total > 0) {
      result.push({
        id: category.id,
        name: category.name,
        iconId: category.iconId,
        color: category.color,
        amount: total,
        percentage: parseFloat(percentage.toFixed(2)),
      });
    }

    return result;
  }, []);
};
