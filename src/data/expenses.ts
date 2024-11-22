import IconFood from '../icons/food.svg';
import IconTravel from '../icons/travel.svg';
import IconHealth from '../icons/health.svg';

import type { IIcon, IUser } from '../types/Expenses';

export const icons: Record<string, IIcon> = {
  groceries: { name: 'Groceries', Component: IconFood },
  travel: { name: 'Travel', Component: IconTravel },
  health: { name: 'Health', Component: IconHealth },
};

export const user: IUser = {
  name: 'Иван',
  email: 'P3M4f@example.com',
  password: '123123',
  categories: [
    {
      id: 'groceries',
      name: 'Groceries',
      iconId: 'groceries',
      color: '#4CAF50',
      limit: 500,
    },
    {
      id: 'travel',
      name: 'Travel',
      iconId: 'travel',
      color: '#FF5722',
      limit: 200,
    },
    {
      id: 'health',
      name: 'Health',
      iconId: 'health',
      color: '#FF5722',
      limit: 200,
    },
  ],
  expenses: [
    {
      id: 'expense-1',
      categoryId: 'groceries',
      date: '2024-11-17',
      amount: 50,
      originalAmount: { value: 55, currency: 'USD' },
    },
    {
      id: 'expense-2',
      categoryId: 'cafe',
      date: '2024-11-18',
      amount: 15,
      originalAmount: { value: 17, currency: 'USD' },
    },
  ],
};
