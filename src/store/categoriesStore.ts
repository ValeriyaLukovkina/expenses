import { ICategory } from '@/types/Expenses';
import { create } from 'zustand';

interface CategoriesStoreState {
  categories: ICategory[];

  setCategories: (categories: ICategory[]) => void;
  addCategory: (category: ICategory) => void;
  removeCategory: (id: string) => void;
}

const categoriesStore = create<CategoriesStoreState>((set) => ({
  categories: [],

  setCategories: (categories: ICategory[]) =>
    set(() => {
      return { categories: [...categories] };
    }),

  addCategory: (category: ICategory) =>
    set((state) => ({ categories: [...state.categories, category] })),

  removeCategory: (id: string) =>
    set((state) => ({ categories: state.categories.filter((category) => category.id !== id) })),
}));

export default categoriesStore;
