import type { FC } from 'react';

export interface IOriginalAmount {
  value: number;
  currency: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  categories: ICategory[];
  expenses: IExpense[];
}

export interface IIcon {
  name: string;
  Component: FC<{ className: string }>;
}

export interface ICategory {
  id: string;
  name: string;
  iconId: string;
  color: string;
  limit?: number;
}

export interface IExpense {
  id: string;
  categoryId: string;
  date: string;
  amount: number;
  originalAmount?: IOriginalAmount;
}
