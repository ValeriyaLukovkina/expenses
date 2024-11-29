import { IUser } from '@/types/Expenses';
import { create } from 'zustand';

interface UserStoreState {
  user: IUser | null;
  
  setUser: (user: IUser) => void;
}

const userStore = create<UserStoreState>((set) => ({
  user: null,

  setUser: (user: IUser) => set({ user }),
}));

export default userStore;
