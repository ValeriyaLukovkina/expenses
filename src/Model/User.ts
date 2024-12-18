import { Schema, models, model } from 'mongoose';

import type { Document } from 'mongoose';

interface IOriginalAmount {
  value: number;
  currency: string;
}

interface ICategory extends Document {
  id: string;
  name: string;
  iconId: string;
  color: string;
  limit?: number;
}

interface IExpense extends Document {
  id: string;
  categoryId: string;
  date: string;
  amount: number;
  originalAmount?: IOriginalAmount;
}

interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  isActivated: boolean;
  activationLink?: string;
  categories: ICategory[];
  expenses: IExpense[];
}

const CategorySchema = new Schema<ICategory>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  iconId: { type: String },
  color: { type: String },
  limit: { type: Number },
});

const ExpenseSchema = new Schema<IExpense>({
  id: { type: String, required: true },
  categoryId: { type: String, required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  originalAmount: {
    value: { type: Number },
    currency: { type: String },
  },
});

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  categories: [CategorySchema],
  expenses: [ExpenseSchema],
});

const User = models.User || model('User', UserSchema);

export default User;
