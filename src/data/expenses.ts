import IconCroissant from '../icons/IconCroissant/IconCroissant';
import IconBall from '../icons/IconBall/IconBall';
import IconBike from '../icons/IconBike/IconBike';
import IconClothes from '../icons/IconClothes/IconClothes';
import IconExercise from '../icons/IconExercise/IconExercise';
import IconFlatware from '../icons/IconFlatware/IconFlatware';
import IconGamepad from '../icons/IconGamepad/IconGamepad';
import IconGift from '../icons/IconGift/IconGift';
import IconGrocery from '../icons/IconGrocery/IconGrocery';
import IconHeart from '../icons/IconHeart/IconHeart';
import IconHome from '../icons/IconHome/IconHome';
import IconPlane from '../icons/IconPlane/IconPlane';
import IconStart from '../icons/IconStart/IconStart';

import type { IIcon, IUserDB } from '../types/Expenses';

export const icons: Record<string, IIcon> = {
  croissant: { name: 'croissant', Component: IconCroissant },
  ball: { name: 'ball', Component: IconBall },
  bike: { name: 'bike', Component: IconBike },
  clothes: { name: 'clothes', Component: IconClothes },
  exersize: { name: 'exersize', Component: IconExercise },
  flatware: { name: 'flatware', Component: IconFlatware },
  gamepad: { name: 'gamepad', Component: IconGamepad },
  gift: { name: 'gift', Component: IconGift },
  grocery: { name: 'grocery', Component: IconGrocery },
  heart: { name: 'heart', Component: IconHeart },
  home: { name: 'home', Component: IconHome },
  plane: { name: 'plane', Component: IconPlane },
  start: { name: 'start', Component: IconStart },
};

export const user: IUserDB = {
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
