'use client';

import { useEffect } from 'react';

import userStore from '@/store/userStore';
import categoriesStore from '@/store/categoriesStore';
import expensesStore from '@/store/expensesStore';
import type { FC } from 'react';
import type { IUserDB } from '@/types/Expenses';

interface MainClientProps {
  user: IUserDB;
}

const MainClient: FC<MainClientProps> = (props) => {
  const { user } = props;

  const setUser = userStore((state) => state.setUser);
  const setCategories = categoriesStore((state) => state.setCategories);
  const setExpenses = expensesStore((state) => state.setExpenses);

  useEffect(() => {
    const userData = {
      name: user.name,
      email: user.email,
    };

    setUser(userData);
    setCategories(user.categories);
    setExpenses(user.expenses);
  }, [user]);

  return null;
};

export default MainClient;
