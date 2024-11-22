import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  iconId: { type: String },
  color: { type: String },
  limit: { type: Number },
});

const ExpenseSchema = new mongoose.Schema({
  id: { type: String, required: true },
  categoryId: { type: String, required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  originalAmount: {
    value: { type: Number },
    currency: { type: String },
  },
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  categories: [CategorySchema],
  expenses: [ExpenseSchema],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
