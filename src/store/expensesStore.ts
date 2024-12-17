import { getExpensesSum } from '@/app/_utils/getExpensesSum';
import { IExpense } from '@/types/Expenses';
import { create } from 'zustand';

interface ExpensesStoreState {
  expenses: IExpense[];
  totalExpenses: number;
  sort: 'date' | 'amount';

  setExpenses: (expenses: IExpense[]) => void;
  addExpense: (expense: IExpense) => void;
  removeExpense: (id: string) => void;
}

const expensesNew: IExpense[] = [
  {
    id: '1',
    categoryId: 'health',
    date: '2024-11-27T14:30:00Z',
    amount: 15.5,
    originalAmount: {
      currency: 'USD',
      value: 15.5,
    },
  },
  {
    id: '2',
    categoryId: 'home',
    date: '2024-11-27T08:15:00Z',
    amount: 50,
  },
  {
    id: '3',
    categoryId: 'restauraunt',
    date: '2024-11-27T20:45:00Z',
    amount: 120.75,
    originalAmount: {
      currency: 'EUR',
      value: 110,
    },
  },
];

const expensesStore = create<ExpensesStoreState>((set) => ({
  expenses: [],
  totalExpenses: 0,
  sort: 'date',

  setExpenses: (expenses: IExpense[]) =>
    set({ expenses: [...expensesNew], totalExpenses: getExpensesSum(expensesNew) }),

  addExpense: (expense: IExpense) =>
    set((state) => {
      const updateExpenses = [...state.expenses, expense];

      return {
        expenses: updateExpenses,
        totalExpenses: getExpensesSum(updateExpenses),
      };
    }),

  removeExpense: (id: string) =>
    set((state) => ({ expenses: state.expenses.filter((expense) => expense.id !== id) })),
}));

export default expensesStore;
