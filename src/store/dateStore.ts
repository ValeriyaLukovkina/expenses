import { create } from 'zustand';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

import type { Dayjs } from 'dayjs';

dayjs.extend(isoWeek);

export interface IFilters {
  id: 'day' | 'week' | 'month' | 'year';
  label: string;
}

export type FilterId = IFilters['id'];

interface DateStoreState {
  selectPeriod: FilterId;
  selectDate: Dayjs;
  filtersByPeriod: IFilters[];

  setSelectPeriod: (period: FilterId) => void;
  goToPreviousDate: () => void;
  goToNextDate: () => void;
}

const dateStore = create<DateStoreState>((set) => ({
  selectPeriod: 'day',
  selectDate: dayjs(),
  filtersByPeriod: [
    {
      id: 'day',
      label: 'Day',
    },
    {
      id: 'week',
      label: 'Week',
    },
    {
      id: 'month',
      label: 'Month',
    },
    {
      id: 'year',
      label: 'Year',
    },
  ],

  setSelectPeriod: (period: FilterId) => set({ selectPeriod: period }),
  goToPreviousDate: () =>
    set(({ selectPeriod, selectDate }) => {
      return { selectDate: selectDate.subtract(1, selectPeriod) };
    }),
  goToNextDate: () =>
    set(({ selectPeriod, selectDate }) => {
      return { selectDate: selectDate.add(1, selectPeriod) };
    }),
}));

export default dateStore;
